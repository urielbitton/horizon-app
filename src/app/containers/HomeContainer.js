import React, { useContext, useEffect } from 'react'
import './styles/HomeContainer.css'
import Navbar from '../components/layout/Navbar'
import { Route, Switch } from 'react-router'
import { StoreContext } from '../store/store'
import ErrorPage from "../pages/ErrorPage"
import Home from '../pages/Home'
import VideoCalls from '../pages/VideoCalls'
import VoiceCalls from '../pages/VoiceCalls'
import ChatMessages from '../pages/ChatMessages'
import MyBusiness from '../pages/MyBusiness'
import Analytics from '../pages/Analytics'
import Settings from '../pages/Settings'
import Support from "../pages/Support"

export default function HomeContainer() {

  const { myUser, openSidebar, setOpenSidebar} = useContext(StoreContext)

  useEffect(() => {
    if(openSidebar) 
      window.onclick = () => setOpenSidebar(false)
  },[openSidebar])

  return (
    <div className="home-container">
      <Navbar />
      <div className="viewable-content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/video-calls">
            <VideoCalls />
          </Route>
          <Route exact path="/voice-calls">
            <VoiceCalls />
          </Route>
          <Route exact path="/chat-messages">
            <ChatMessages />
          </Route>
          <Route exact path="/my-business">
            <MyBusiness />
          </Route>
          <Route exact path="/analytics">
            <Analytics />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/support">
            <Support />
          </Route>
          <Route exact path="*" component={ErrorPage} />
        </Switch>
      </div>
    </div>
  )
}
