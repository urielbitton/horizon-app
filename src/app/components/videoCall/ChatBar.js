import React, { useState } from 'react'
import './styles/ChatBar.css'
import { useMeeting } from "@videosdk.live/react-sdk"
import TextareaAutosize from "react-textarea-autosize"
import { formatAMPM } from '../../utils/dateUtils'

export default function ChatBar(props) {

  const { showChatBar, setShowChatBar, localParticipant } = props
  const { sendChatMessage, messages } = useMeeting()
  const [message, setMessage] = useState("")

  const messagesRender = messages
  ?.sort((a,b) => a.timestamp < b.timestamp ? 1 : -1)
  .map((message, i) => {
    return <div
      className={`chat-bubble-container ${localParticipant?.id === message.senderId ? 'me' : ''}`}
      key={i}
    >
      <div className="chat-text">
        <div className={`chat-bubble`}>
          <h6>{message.senderName} {localParticipant?.id === message.senderId && '(Me)'}</h6>
          <p>{message.text}</p>
        </div>
        <small>{formatAMPM(new Date(parseInt(message.timestamp)))}</small>
      </div>
    </div>
  })

  const handleEnterSend = (e) => {
    if(e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const sendMessage = () => {
    if (message.length) {
      sendChatMessage(message)
      setMessage("")
    }
  }

  return (
    <div className={`meeting-chat-bar ${showChatBar ? 'show' : ''}`}>
      <header>
        <h3>Chat</h3>
        <i 
          className="fal fa-times"
          onClick={() => setShowChatBar(false)}
        ></i>
      </header>
      <section>
        <div className="messages-flex">
          {messagesRender}
        </div>
      </section>
      <footer>
        <div className="textarea-container">
          <TextareaAutosize 
            placeholder="Type a message..."
            className="app-textarea"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyUp={(e) => handleEnterSend(e)}
          />
          <i 
            className="fal fa-paper-plane send-btn"
            onClick={() => sendMessage()}
          ></i>
        </div>
      </footer>
    </div>
  )
}
