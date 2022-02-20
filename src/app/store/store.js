import React, { createContext, useEffect, useState } from 'react'
import { db, auth } from '../firebase/fire'

export const StoreContext = createContext()

const StoreContextProvider = ({children}) => {

  const user = auth.currentUser
  const [accessApp, setAccessApp] = useState(true)
  const [myUser, setMyUser] = useState({})
  const [aUser, setAUser] = useState({})
  const [loggingAuth, setLoggingAuth] = useState(true)
  const [windowPadding, setWindowPadding] = useState("100px 30px 0px 30px")
  const [openSidebar, setOpenSidebar] = useState(false)
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkmode') === "true" ? true : false)
  const [videoTrack, setVideoTrack] = useState(null)

  const currencyFormat = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'})
  const percentFormat = new Intl.NumberFormat('en-CA', {style: 'percent'})

  useEffect(() => {
    if(user) {
      db.collection('users').doc(user.uid).onSnapshot(snap => {
        setMyUser(snap.data()) 
      })
    }
    auth.onAuthStateChanged(user => user?setAUser(user):setAUser({}))
  },[user])

  useEffect(() => {
    localStorage.setItem('darkmode', !darkMode ? "false" : "true")  
  },[darkMode])  
  

  return <StoreContext.Provider value={{ 
    user, myUser, setMyUser, aUser, setAUser, 
    loggingAuth, setLoggingAuth, 
    accessApp, setAccessApp,
    windowPadding, setWindowPadding,
    openSidebar, setOpenSidebar,
    darkMode, setDarkMode,
    currencyFormat, percentFormat,
    videoTrack, setVideoTrack
  }}>
    {children}
  </StoreContext.Provider>
}
export default StoreContextProvider