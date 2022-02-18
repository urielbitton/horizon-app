import React, { useEffect, useRef, useState, useContext } from "react"
import { useRouteMatch } from 'react-router-dom'
import { MeetingProvider, useMeeting, useParticipant, useConnection } from "@videosdk.live/react-sdk"
import { getToken } from "../components/videoCall/api"
import { StoreContext } from '../store/store'
import VideoCallScreen from "../components/videoCall/VideoCallScreen"
import { useHistory } from "react-router-dom"

const primary = "#131C55";
const width = 400;
const height = (width * 2) / 3;
const borderRadius = 8;

const chunk = (arr) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  return newArr;
};

const Title = ({ title, dark }) => {
  return <h2 style={{ color: dark ? primary : "#fff" }}>{title}</h2>;
};

const ExternalVideo = () => {
  const [{ link, playing }, setVideoInfo] = useState({
    link: null,
    playing: false,
  });

  const onVideoStateChanged = (data) => {
    const { currentTime, link, status } = data;

    switch (status) {
      case "stopped":
        console.log("stopped in switch");
        externalPlayer.current.src = null;
        setVideoInfo({ link: null, playing: false });
        break;
      case "resumed":
        if (typeof currentTime === "number") {
          externalPlayer.current.currentTime = currentTime;
        }
        externalPlayer.current.play();
        setVideoInfo((s) => ({ ...s, playing: true }));
        break;
      case "paused":
        externalPlayer.current.pause();
        setVideoInfo((s) => ({ ...s, playing: false }));
        break;
      case "started":
        setVideoInfo({ link, playing: true });
        break;
      default:
        break;
    }
  };

  const onVideoSeeked = (data) => {
    const { currentTime } = data;
    if (typeof currentTime === "number") {
      externalPlayer.current.currentTime = currentTime;
    }
  };

  useMeeting({ onVideoStateChanged, onVideoSeeked });
  const externalPlayer = useRef();

  return !link ? null : (
    <div
      style={{
        borderRadius,
        padding: borderRadius,
        margin: borderRadius,
        backgroundColor: primary,
        display: "flex",
      }}
    >
      <Title title={"External Video"} />

      <video
        style={{ borderRadius, height, width, backgroundColor: "black" }}
        autoPlay
        ref={externalPlayer}
        src={link}
      />
    </div>
  );
};


const ParticipantView = ({ participantId }) => {
  const webcamRef = useRef(null);
  const micRef = useRef(null);
  const screenShareRef = useRef(null);

  const onStreamEnabled = (stream) => {};
  const onStreamDisabled = (stream) => {};

  const { 
    displayName, participant, webcamStream, micStream, screenShareStream, webcamOn, 
    micOn, screenShareOn, isLocal, isActiveSpeaker, isMainParticipant,
    switchTo, pinState, setQuality, enableMic, disableMic, enableWebcam,
    disableWebcam, pin, unpin 
  } = useParticipant(participantId, { onStreamEnabled, onStreamDisabled })

  useEffect(() => {
    if (webcamRef.current) {
      if (webcamOn) {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(webcamStream.track)
        webcamRef.current.srcObject = mediaStream
        webcamRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          )
      } 
      else {
        webcamRef.current.srcObject = null
      }
    }
  }, [webcamStream, webcamOn])

  useEffect(() => {
    if (micRef.current) {
      if (micOn) {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(micStream.track)
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          )
      } 
      else {
        micRef.current.srcObject = null
      }
    }
  }, [micStream, micOn])

  useEffect(() => {
    if (screenShareRef.current) {
      if (screenShareOn) {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(screenShareStream.track)
        screenShareRef.current.srcObject = mediaStream
        screenShareRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          )
      } 
      else {
        screenShareRef.current.srcObject = null
      }
    }
  }, [screenShareStream, screenShareOn])

  return (
    <div className="video-container">
      <audio ref={micRef} autoPlay muted={isLocal} />
      <video
        ref={webcamRef}
        autoPlay
      />
    </div>
  )
}

const ParticipantsView = () => {
  
  const { participants } = useMeeting();

  return (
    chunk([...participants.keys()]).map((k) => (
        k.map((l) => (
          <ParticipantView key={l} participantId={l} />
        ))
    ))
  );
};

const ConnectionView = ({ connectionId }) => {
  const { connection } = useConnection(connectionId, {
    onMeeting: {
      onChatMessage: ({ message, participantId }) => {
        alert(
          `A Person ${participantId} from ${connectionId} Wants to say : ${message}`
        );
      },
    },
  });

  const connectionParticipants = [...connection.meeting.participants.values()];

  const ConnectionParticipant = ({ participant }) => {
    return (
      <div style={{ padding: 4, border: "1px solid blue" }}>
        <p>{participant.displayName}</p>
        <button
          onClick={async () => {
            const meetingId = prompt(
              `In Which meetingId you want to switch ${participant.displayName} ?`
            );
            const payload = prompt("enter payload you want to pass");

            const token = await getToken();
            if ((meetingId, token, payload)) {
              participant
                .switchTo({ meetingId, token, payload })
                .catch(console.log);
            } else {
              alert("Empty meetingId or payload ");
            }
          }}
          className={"button "}
        >
          Switch
        </button>
      </div>
    );
  };

  return (
    <div
      style={{
        width,
        backgroundColor: primary,
        borderRadius: borderRadius,
        overflow: "hidden",
        margin: borderRadius,
        padding: borderRadius,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        position: "relative",
      }}
    >
      <button
        onClick={() => {
          connection.close();
        }}
        className={"button"}
      >
        Close Connection
      </button>

      <button
        onClick={() => {
          const message = prompt("Enter You Message");
          if (message) {
            connection.meeting.sendChatMessage(message);
          } else {
            alert("Empty Message ");
          }
        }}
        className={"button"}
      >
        Send Meessage
      </button>
      <button
        onClick={() => {
          connection.meeting.end();
        }}
        className={"button"}
      >
        End Meeting
      </button>
      <p>
        {connection.id} : {connection.payload}
      </p>
      {connectionParticipants.map((participant) => {
        return (
          <ConnectionParticipant
            key={`${connection.id}_${participant.id}`}
            participant={participant}
          />
        );
      })}
    </div>
  );
};

const ConnectionsView = () => {
  const { connections, meetingId } = useMeeting();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: borderRadius,
      }}
    >
      <Title dark title={"Connections"} />
      {chunk([...connections.keys()]).map((k) => (
        <div style={{ display: "flex" }} key={k}>
          {k.map((l) => (
            <ConnectionView key={`${meetingId}_${l}`} connectionId={l} />
          ))}
        </div>
      ))}
    </div>
  );
};

function MeetingView({ onNewMeetingIdToken, onMeetingLeave }) {

  const [participantViewVisible, setParticipantViewVisible] = useState(true)
  const history = useHistory()

  function onParticipantJoined(participant) {
    console.log(" onParticipantJoined", participant);
  }
  function onParticipantLeft(participant) {
    console.log(" onParticipantLeft", participant);
  }
  const onSpeakerChanged = (activeSpeakerId) => {
    console.log(" onSpeakerChanged", activeSpeakerId);
  };
  function onPresenterChanged(presenterId) {
    console.log(" onPresenterChanged", presenterId);
  }
  function onMainParticipantChanged(participant) {
    console.log(" onMainParticipantChanged", participant);
  }
  function onEntryRequested(participantId, name) {
    console.log(" onEntryRequested", participantId, name);
  }
  function onEntryResponded(participantId, name) {
    console.log(" onEntryResponded", participantId, name);
  }
  function onRecordingStarted() {
    console.log(" onRecordingStarted");
  }
  function onRecordingStopped() {
    console.log(" onRecordingStopped");
  }
  function onChatMessage(data) {
    console.log(" onChatMessage", data);
  }
  function onMeetingJoined() {
    console.log("onMeetingJoined");
  }
  function onMeetingLeft() {
    console.log("onMeetingLeft");
    onMeetingLeave()
    history.push('/join-meeting')
  }
  const onLiveStreamStarted = (data) => {
    console.log("onLiveStreamStarted example", data);
  };
  const onLiveStreamStopped = (data) => {
    console.log("onLiveStreamStopped example", data);
  };
  const onVideoStateChanged = (data) => {
    console.log("onVideoStateChanged", data);
  };
  const onVideoSeeked = (data) => {
    console.log("onVideoSeeked", data);
  };
  const onWebcamRequested = (data) => {
    console.log("onWebcamRequested", data);
  };
  const onMicRequested = (data) => {
    console.log("onMicRequested", data);
  };
  const onPinStateChanged = (data) => {
    console.log("onPinStateChanged", data);
  };
  const onSwitchMeeting = (data) => {
    window.focus();
  };

  const onConnectionOpen = (data) => {
    console.log("onConnectionOpen", data);
  };

  const {
    meetingId,
    meeting,
    localParticipant,
    mainParticipant,
    activeSpeakerId,
    participants,
    presenterId,
    localMicOn,
    localWebcamOn,
    localScreenShareOn,
    messages,
    isRecording,
    isLiveStreaming,
    pinnedParticipants,
    join,
    leave,
    connectTo,
    end,
    startRecording,
    stopRecording,
    sendChatMessage,
    respondEntry,
    muteMic,
    unmuteMic,
    toggleMic,
    disableWebcam,
    enableWebcam,
    toggleWebcam,
    disableScreenShare,
    enableScreenShare,
    toggleScreenShare,
    getMics,
    getWebcams,
    changeWebcam,
    changeMic,
    startVideo,
    stopVideo,
    resumeVideo,
    pauseVideo,
    seekVideo,
    startLivestream,
    stopLivestream,
  } = useMeeting({
    onParticipantJoined,
    onParticipantLeft,
    onSpeakerChanged,
    onPresenterChanged,
    onMainParticipantChanged,
    onEntryRequested,
    onEntryResponded,
    onRecordingStarted,
    onRecordingStopped,
    onChatMessage,
    onMeetingJoined,
    onMeetingLeft,
    onLiveStreamStarted,
    onLiveStreamStopped,
    onVideoStateChanged,
    onVideoSeeked,
    onWebcamRequested,
    onMicRequested,
    onPinStateChanged,
    onSwitchMeeting,
    onConnectionOpen,
  });

  const handlestartVideo = () => {
    console.log("handlestartVideo");

    startVideo({
      link: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    });
  };
  const handlestopVideo = () => {
    stopVideo();
  };
  const handleresumeVideo = () => {
    resumeVideo();
  };
  const handlepauseVideo = () => {
    pauseVideo({ currentTime: 2 });
  };
  const handlesseekVideo = () => {
    seekVideo({ currentTime: 5 });
  };
  const handleStartLiveStream = () => {
    startLivestream([
      {
        url: "rtmp://a.rtmp.youtube.com/live2",
        streamKey: "key",
      },
    ]);
  };
  const handleStopLiveStream = () => {
    stopLivestream();
  };
  const handleStartRecording = () => {
    startRecording();
  };
  const handleStopRecording = () => {
    stopRecording();
  };

  const tollbarHeight = 120;

  return (
    <VideoCallScreen 
      ParticipantsView={ParticipantsView}
      ConnectionsView={ConnectionsView}
      participantViewVisible={participantViewVisible}
      leave={leave}
      toggleWebcam={toggleWebcam}
      toggleMic={toggleMic}
      localWebcamOn={localWebcamOn}
      localMicOn={localMicOn}
    />
  )
}

export default function VideoCallApp() {

  const { myUser } = useContext(StoreContext)
  const currentMeetingID = useRouteMatch('/video-call/:meetingID/:token').params.meetingID
  const currentToken = useRouteMatch('/video-call/:meetingID/:token').params.token
  const [token, setToken] = useState("")
  const [meetingID, setMeetingID] = useState("")
  const [micOn, setMicOn] = useState(true)
  const [webcamOn, setWebcamOn] = useState(true)

  const meetingConfig = {
    meetingId: currentMeetingID,
    token: currentToken,
    micEnabled: micOn,
    webcamEnabled: webcamOn,
    name: `${myUser?.firstName} ${myUser?.lastName}`,
  }

  return (
    <MeetingProvider
      config={meetingConfig}
      token={currentToken}
      reinitialiseMeetingOnConfigChange={true}
      joinWithoutUserInteraction={true}
    >
      <MeetingView
        onNewMeetingIdToken={({ meetingId, token }) => {
          setMeetingID(meetingId)
          setToken(token)
        }}
        onMeetingLeave={()=>{
          setToken("")
          setMeetingID("")
          setWebcamOn(false)
          setMicOn(false)
        }}
      />
    </MeetingProvider>
  )
};

