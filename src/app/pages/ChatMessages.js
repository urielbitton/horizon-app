import React from 'react'
import '../components/chats/styles/ChatMessages.css'
import ChatSidebar from '../components/chats/ChatSidebar'
import ChatWindow from "../components/chats/ChatWindow"

export default function ChatMessages() {
  return (
    <div className="chat-flex">
      <ChatSidebar />
      <ChatWindow />
    </div>
  )
}
