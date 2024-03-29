import React, { useContext, useState } from 'react'
import './styles/CreateAMeeting.css'
import createMeetingImg from '../assets/imgs/create-meeting.png'
import AppButton from '../components/ui/AppButton'
import JoiningScreen from "../components/videoCall/JoiningScreen"
import { StoreContext } from "../store/store"

export default function CreateAMeeting() {

  const { myUser } = useContext(StoreContext)
  const [micOn, setMicOn] = useState(true)
  const [webcamOn, setWebcamOn] = useState(true)
  const [isMeetingStarted, setMeetingStarted] = useState(false)

  const startMeeting = () => {
    setWebcamOn(true)
    setMicOn(true)
    setMeetingStarted(true)
  }

  return (
    !isMeetingStarted ? (
      <div className="create-meeting-page">
        <img src={createMeetingImg} alt="" />
        <h3>Create A Meeting</h3>
        <h5>Only contacts that you share your meeting ID&nbsp;<br/>with will be able to join your meeting.</h5>
        <AppButton
          title="Create Meeting"
          buttonType="gradientBtn"
          className="shadow-hover"
          onClick={() => startMeeting()}
        />
      </div> ) :
      <JoiningScreen
        participantName={`${myUser?.firstName} ${myUser?.lastName}`}
        setMicOn={setMicOn}
        micOn={micOn}
        webcamOn={webcamOn}
        setWebcamOn={setWebcamOn}
        setMeetingStarted={setMeetingStarted}
        isCreate
      />
  )
}
  
