import React, { useEffect, useRef, useState } from "react"
import './styles/JoiningScreen.css'
import AppButton from "../ui/AppButton"
import { createMeeting, getToken } from "./api"

export default function JoiningScreen(props) {

  const { meetingID, setMeetingID, token, setToken, setWebcamOn, 
    setMicOn, micOn, webcamOn, onClickStartMeeting } = props
  const [readyToJoin, setReadyToJoin] = useState(true)
  const videoPlayerRef = useRef()
  const [videoTrack, setVideoTrack] = useState(null)

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
    const _meetingId = await createMeeting({token})
    setToken(token)
    setMeetingID(_meetingId)
    setReadyToJoin(true)
    setWebcamOn(true)
    setMicOn(true)
    console.log(_meetingId)
  }

  useEffect(() => {
    if (webcamOn && !videoTrack) {
      getVideo()
    }
  }, [webcamOn])

  useEffect(() => {
    generateMeetingID()
  },[])

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
      <AppButton 
        title="Start Meeting"
        rightIcon="fal fa-arrow-right"
        buttonType="gradientBtn"
        className="shadow-hover"
        url={`/video-call/${meetingID}/${token}`}
      />
    </div>
  )
}
