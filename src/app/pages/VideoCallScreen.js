import React from 'react'
import { useHistory } from "react-router-dom"
import AppButton from "../components/ui/AppButton"
import './styles/VideoCallScreen.css'

export default function VideoCallScreen() {

  const history = useHistory()

  return (
    <div className="video-call-screen">
      <AppButton
        title="Join Meeting"
        gradientBtn
        onClick={() => history.push('/video-call/meeting-room/test-id')}
      />
    </div>
  )
}
