import React from 'react'
import { Route, Switch } from "react-router-dom"
import './styles/ChatWindow.css'
import ChatContent from './ChatContent'

export default function ChatWindow() {
  return (
    <div className="chat-window">
      <Switch>
        <Route path="/chat-messages/new-message">
          <span>New Message</span>
        </Route>
        <Route path="/chat-messages/:chatID">
          <ChatContent />
        </Route>
        <Route path="/chat-messages">
          <span>Select a chat</span>
        </Route>
      </Switch>
    </div>
  )
}
