import React from 'react'
import './styles/CreateAMeeting.css'
import createMeetingImg from '../assets/imgs/create-meeting.png'
import AppButton from '../components/ui/AppButton'

export default function CreateAMeeting() {
  return (
    <div className="create-meeting-page">
      <img src={createMeetingImg} alt="" />
      <h3>Create A Meeting</h3>
      <AppButton
        title="Create Meeting"
        buttonType="gradientBtn"
        className="shadow-hover"
      />
    </div>
  )
}
  
