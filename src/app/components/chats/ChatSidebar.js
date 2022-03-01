import React, { useContext, useEffect, useState } from 'react'
import './styles/ChatSidebar.css'
import SearchBar from '../ui/SearchBar'
import { StoreContext } from '../../store/store'
import { getAllChatsByUser } from "../../services/userServices"
import ChatCard from "./ChatCard"
import { useHistory } from "react-router-dom"

export default function ChatSidebar() {

  const { myUser } = useContext(StoreContext)
  const [chats, setChats] = useState([])
  const history = useHistory()

  const chatsRender = chats?.map((chat, i) => {
    return <ChatCard 
      chat={chat} 
      i={i}
    />
  })

  useEffect(() => {
    getAllChatsByUser(myUser?.chats, setChats)
  },[myUser])

  return (
    <div className="chat-sidebar">
      <header>
        <h3>Messages</h3>
        <div 
          className="icon-container"
          onClick={() => history.push('/chat-messages/new-message')}
        >
          <i className="fal fa-plus"></i>
        </div>
      </header>
      <div className="search-bar-container">
        <SearchBar 
          placeholder="Search messages..."
          className="search-bar"
          showIcon
        />
      </div>
      <section>
        {chatsRender}
      </section>
    </div>
  )
}
