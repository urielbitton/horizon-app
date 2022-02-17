import React, { useContext, useState } from 'react'
import './styles/CreateAMeeting.css'
import joinMeetingImg from '../assets/imgs/join-meeting.png'
import AppButton from '../components/ui/AppButton'
import JoiningScreen from "../components/videoCall/JoiningScreen"
import { StoreContext } from "../store/store"

export default function JoinAMeeting() {

  const { myUser } = useContext(StoreContext)
  const [token, setToken] = useState("")
  const [meetingID, setMeetingID] = useState('')
  const [participantName, setParticipantName] = useState("")
  const [micOn, setMicOn] = useState(false)
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
        <img src={joinMeetingImg} alt="" />
        <h3>Join A Meeting</h3>
        <h5>Only contacts that you share your meeting ID<br/>with will be able to join your meeting.</h5>
        <label className="join-input">
          <small>Meeting ID</small>
          <div className="icon-container">
            <i className="fas fa-keyboard"></i>
          </div>
          <input 
            onChange={(e) => setMeetingID(e.target.value)}
            value={meetingID}
          />
          <div className="btn-container">
            <AppButton
              title="Join"
              disabled={!meetingID.match("\\w{4}\\-\\w{4}\\-\\w{4}")}
              onClick={() => startMeeting()}
            />
          </div>
        </label>
      </div> ) :
      <JoiningScreen
        participantName={`${myUser?.firstName} ${myUser?.lastName}`}
        joinMeetingID={meetingID}
        token={token}
        setToken={setToken}
        setMicOn={setMicOn}
        micOn={micOn}
        webcamOn={webcamOn}
        setWebcamOn={setWebcamOn}
      />
  )
}
  
