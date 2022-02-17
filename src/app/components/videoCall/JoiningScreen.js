import React, { useEffect, useRef, useState } from "react"
import './styles/JoiningScreen.css'
import AppButton from "../ui/AppButton"
import { createMeeting, getToken, validateMeeting } from "./api"

export default function JoiningScreen(props) {

  const { joinMeetingID, setWebcamOn, setMicOn, micOn, webcamOn, isCreate } = props
  const [readyToJoin, setReadyToJoin] = useState(true)
  const [meetingID, setMeetingID] = useState('')
  const videoPlayerRef = useRef()
  const [videoTrack, setVideoTrack] = useState(null)
  const [token, setToken] = useState('')
  const allowStartMeeting = meetingID.length && token.length

  const handleToggleWebcam = () => {
    if (!webcamOn) {
      getVideo()
    } else {
      if (videoTrack) {
        videoTrack.stop()
        setVideoTrack(null)
      } 
    }
    setWebcamOn(prev => !prev)
  }
  const getVideo = async () => {
    if (videoPlayerRef.current) {
      const videoConstraints = {
        video: {
          width: 1280,
          height: 720,
        }
      }
      const stream = await navigator.mediaDevices.getUserMedia(videoConstraints)
      const videoTracks = stream.getVideoTracks()
      const videoTrack = videoTracks.length ? videoTracks[0] : null
      videoPlayerRef.current.srcObject = new MediaStream([videoTrack])
      videoPlayerRef.current.play()
      setVideoTrack(videoTrack)
    }
  }

  const generateMeetingID = async () => {
    const token = await getToken()
    const _meetingID = await createMeeting({token})
    setMeetingID(_meetingID)
    setToken(token)
    setReadyToJoin(true)
    setWebcamOn(true)
    setMicOn(true)
    console.log(_meetingID)
  }

  const requestJoinMeeting = async (meetingID) => {
    const token = await getToken()
    const valid = await validateMeeting({ meetingId: meetingID, token })
    if (valid) {
      setReadyToJoin(true);
      setToken(token)
      setWebcamOn(true)
      setMicOn(true)
    } 
    else {
      window.alert("Invalid Meeting ID")
    }
  }

  useEffect(() => {
    if (webcamOn && !videoTrack) {
      getVideo()
    }
  }, [webcamOn])

  useEffect(() => {
    if(isCreate) {
      generateMeetingID()
    }
    else {
      setMeetingID(joinMeetingID)
    }
  },[])

  useEffect(() => {
    if(!isCreate && meetingID.length) {
      requestJoinMeeting(meetingID)
    }
  },[meetingID])

  return (
    <div className="joining-screen">
      <div className="preview-container">
        <video
          autoPlay
          playsInline
          muted
          ref={videoPlayerRef}
          controls={false}
        />
        <div className="actions">
          <div 
            className={`icon-container ${!micOn ? "inactive" : ""}`}
            onClick={() => setMicOn(prev => !prev)}
          >
            <i className={`fas ${micOn ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
          </div>
          <div 
            className={`icon-container ${!webcamOn ? "inactive" : ""}`}
            onClick={() => handleToggleWebcam()}
          >
            <i className={`fas ${webcamOn ? 'fa-video' : 'fa-video-slash'}`}></i>
          </div>
        </div>
      </div>
      {
        allowStartMeeting ?
        <AppButton 
          title={isCreate ? "Start Meeting" : "Join Meeting"}
          rightIcon="fal fa-arrow-right"
          buttonType="gradientBtn"
          className="shadow-hover"
          url={`/video-call/${meetingID}/${token}`}
        /> :
        <></>
      }
    </div>
  )
}
