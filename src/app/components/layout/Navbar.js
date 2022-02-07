import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../store/store'
import './styles/Navbar.css'
import { auth } from '../../firebase/fire'
import NotificationsDropdown from "./NotificationsDropdown"
import { useLocation } from "react-router-dom"
import placeholder from '../../assets/imgs/placeholder.jpg'
import SearchBar from '../ui/SearchBar'

export default function Navbar() {

  const {user, myUser, openSidebar, setOpenSidebar, darkMode, setDarkMode} = useContext(StoreContext)
  const [slideProfile, setSlideProfile] = useState(false)
  const [slideNotifs, setSlideNotifs] = useState(false)
  const location = useLocation()

  const signOut = (e) => {
    e.preventDefault()
    if(user) {
      auth.signOut()
      .then(() => {
        console.log('Logged out')
      })
    }
  }

  const openNotifs = (e) => {
    if(!location.pathname.includes('notifications')) {
      e.stopPropagation()
      setSlideNotifs(prev => !prev)
    }
  }

  useEffect(() => {
    window.onclick = () => {
      setSlideProfile(false)
      setSlideNotifs(false)
    }
  },[slideProfile])


  return (
    <div className="navbar">
      <div className="side">
        <div 
          className={`mobile-menu-btn ${openSidebar ? "open" : ""}`} 
          onClick={(e) => {
            e.stopPropagation()
            setOpenSidebar(prev => !prev)}
          }
        >
          <i className="fal fa-bars"></i>
        </div>
        <SearchBar showIcon />
      </div>
      <div className="side right">
        <div className={`notifications-dropdown ${slideNotifs ? "open" : ""}`}>
          <NotificationsDropdown 
            setSlideNotifs={setSlideNotifs}
          />
        </div>
        <div className="nav-profile-container">
          <div className="text-info-container">
            <h5>{myUser?.firstName} {myUser?.lastName}</h5>
            <Link to={`/`} className="linkable">My Profile</Link>
          </div>
          <div 
            className="img-container" 
            onClick={(e) => {
              e.stopPropagation()
              setSlideProfile(prev => !prev)}
            }
          >
            <img src={myUser?.photoURL?.length ? myUser?.photoURL : placeholder} alt=""/>
            <i className="fal fa-angle-down"></i>
          </div>
          <div className={`profile-slide ${slideProfile ? "open" : ""}`}>
            <Link to="#"><i className="far fa-user"></i>My Account</Link>
            <Link to="#"><i className="far fa-sliders-h"></i>Preferences</Link>
            <Link to="#"><i className="far fa-rocket"></i>Upgrade</Link>
            <Link to="/" onClick={(e) => signOut(e)}><i className="far fa-sign-out"></i>Logout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
