import React, { useEffect } from 'react'
import './styles/VideoCallScreen.css'

export default function VideoCallScreen(props) {

  const { ParticipantsView, ConnectionsView, participantViewVisible, leave,
    toggleWebcam, toggleMic, localWebcamOn, localMicOn } = props
  const videosNum = 1

  return (
    <div className="video-call-screen">
      <div className="meeting-options-btn">
        <i className="fal fa-bars"></i>
      </div>
      <div className={`videos-grid videos-grid-${videosNum}`}>
        {
          participantViewVisible ? 
          <ParticipantsView /> : 
          <ConnectionsView />
        }
      </div>
      <div className="meeting-bar-container">
        <div className="meeting-bar">
          <div 
            className={!localMicOn ? 'inactive' : ''}
            onClick={toggleMic}
          >
            <i className={`fal ${localMicOn ? "fa-microphone" : "fa-microphone-slash"}`}></i>
          </div>
          <div 
            className={!localWebcamOn ? 'inactive' : ''}
            onClick={toggleWebcam}
          >
            <i className={`fal ${localWebcamOn ? "fa-video" : "fa-video-slash"}`}></i>
          </div>
          <div 
            className="red"
            onClick={leave}
          >
            <i className="fal fa-phone"></i>
          </div>
        </div>
      </div>
    </div>
  )
}
