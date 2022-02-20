import React, { useContext, useEffect, useState } from 'react'
import './styles/VideoCallScreen.css'
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk"
import { StoreContext } from "../../store/store"
import { setDB, getRandomDocID } from '../../services/CrudDB'

export default function VideoCallScreen(props) {

  const { videoTrack, setVideoTrack, myUser } = useContext(StoreContext)
  const { ParticipantsView, ConnectionsView, participantViewVisible, leave,
    toggleWebcam, toggleMic, localWebcamOn, localMicOn, meetingID,
    toggleScreenShare, localParticipant } = props

  const onStreamEnabled = (stream) => {}
  const onStreamDisabled = (stream) => {}
  const [showTools, setShowTools] = useState(true)
  const { participants } = useMeeting()
  const { screenShareOn, screenShareStream, webcamStream } = useParticipant(localParticipant?.id, { onStreamEnabled, onStreamDisabled })
  const participantsNum = participants.size

  const copyMeetingID = () => {
    navigator.clipboard.writeText(meetingID)
    .then(() => {
      console.log('Async: Copying to clipboard was successful!');
    })
    .catch(err => {
      console.log(err)
    })
  }

  const endMeeting = () => {
    leave()
    videoTrack.stop()
    setVideoTrack(null)
  }

  useEffect(() => {
    if(participantsNum === 2) {
      const path = `users/${myUser?.userID}/videoMeetings`
      const docID = getRandomDocID(path)
      setDB(path, docID, {
        duration: 0,
        meetingDate: new Date(),
        meetingID,
        participants: [],
        videoMeetingID: docID
      }) 
    }
  },[participants])

  useEffect(() => {
    toggleWebcam()
  },[screenShareStream])

  return (
    <div className="video-call-screen">
      <div className={`videos-grid videos-grid-${participantsNum}`}>
        {
          participantViewVisible ? 
          <ParticipantsView /> : 
          <ConnectionsView />
        }
      </div> 
      <div className="meeting-bar-container">
        <div className={`meeting-bar ${!showTools ? 'hide' : ''}`}>
          <div 
            className={!localMicOn ? 'inactive' : 'active'}
            onClick={toggleMic}
          >
            <i className={`fal ${localMicOn ? "fa-microphone" : "fa-microphone-slash"}`}></i>
          </div>
          <div 
            className={!localWebcamOn ? 'inactive' : 'active'}
            onClick={() => {
              toggleWebcam()
              screenShareOn && toggleScreenShare()
            }}
          >
            <i className={`fal ${localWebcamOn ? "fa-video" : "fa-video-slash"}`}></i>
          </div>
          <div 
            className={screenShareOn ? 'active' : 'inactive'}
            onClick={toggleScreenShare}
          >
            <i className="fal fa-desktop"></i>
            { !screenShareOn && <i className="fal fa-slash"></i>}
          </div>
          <div>
            <i className="fal fa-comment-alt"></i>
          </div>
          <div>
            <i className="fal fa-user-friends"></i>
          </div>
          <div onClick={() => copyMeetingID()}>
            <i className="fal fa-info-circle"></i>
          </div>
          <div>
            <i className="fal fa-ellipsis-h"></i>
          </div>
          <div 
            className="red"
            onClick={() => endMeeting()}
          >
            <i className="fal fa-phone"></i>
          </div>
        </div>
        <div 
          className={`mobile-show-tools ${showTools ? 'show' : ''}`}
          onClick={() => setShowTools(prev => !prev)}
        >
          <i className={showTools ? 'fal fa-times' : 'fal fa-bars'}></i>
        </div>
      </div>
    </div>
  )
}
