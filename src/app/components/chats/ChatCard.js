import React from 'react'
import './styles/ChatCard.css'
import { getTimeAgo } from '../../utils/dateUtils'
import { truncateText } from '../../utils/generalUtils'
import { useHistory } from "react-router-dom"

export default function ChatCard(props) {

  const { creatorID, recipientID, recipientImg, recipientName,
    lastMessage, lastMessageDate, chatID } = props.chat
  const { myUser } = props
  const history = useHistory()

  return (
    <div 
      className="chat-card"
      onClick={() => history.push(`/chat-messages/${chatID}`)}
    >
      <div className="img-container">
        <img src={recipientImg} alt="" />
      </div>
      <div className="text-container">
        <h5>{recipientName}</h5>
        <h6>
          <span>You:</span>&nbsp;
          {truncateText(lastMessage, 32)}
        </h6>
        <small>{getTimeAgo(lastMessageDate)}</small>
      </div>
    </div>
  )
}
