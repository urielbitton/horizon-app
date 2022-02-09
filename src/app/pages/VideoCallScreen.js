import React from 'react'
import { useRouteMatch } from "react-router-dom"
import { useHistory } from "react-router-dom"
import AppButton from "../components/ui/AppButton"
import './styles/VideoCallScreen.css'
import VideoCallApp from '../components/videoCall/VideoCallApp'

export default function VideoCallScreen(props) {

  const { onClickJoin, onClickCreateMeeting } = props
  const meetingID = useRouteMatch('/video-call/:meetingID').params.meetingID
  const history = useHistory()

  return (
    <div className="video-call-screen">
      <VideoCallApp />
    </div>
  )
}
