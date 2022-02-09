import React from 'react'
import './styles/MeetingRoom.css'
import { useHistory, useRouteMatch } from "react-router-dom"
import VideoCallApp from '../components/videoCall/VideoCallApp'

export default function MeetingRoom() {

  const history = useHistory()
  const meetingID = useRouteMatch('/video-call/:meetingID').params.meetingID

  return <div className="meeting-room-page">
    <i className="fal fa-arrow-left" onClick={() => history.push(`/video-call/${meetingID}`)}></i>
    <VideoCallApp />
  </div>
}
