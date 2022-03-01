import React, { useContext, useEffect, useState } from 'react'
import './styles/Navbar.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../store/store'
import { auth } from '../../firebase/fire'
import NotificationsDropdown from "./NotificationsDropdown"
import { useLocation } from "react-router-dom"
import placeholder from '../../assets/imgs/placeholder.jpg'
import SearchBar from '../ui/SearchBar'

export default function Navbar() {

  const {user, myUser, openSidebar, setOpenSidebar, videoTrack, setVideoTrack } = useContext(StoreContext)
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

  const disableWebcam = () => {
    videoTrack.stop()
    setVideoTrack(null)
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
        <SearchBar 
          placeholder="Search..."
          showIcon 
        />
      </div>
      <div className="side right">
        {
          videoTrack &&
          <div 
            className="nav-icon-btn"
            onClick={() => disableWebcam()}
            title="Disable Webcam"
          >
            <i className="fas fa-webcam-slash"></i>
          </div>
        }
        <div className="nav-icon-btn">
          <i className="far fa-comment-alt"></i>
        </div>
        <div className="nav-icon-btn">
          <i className="far fa-bell"></i>
        </div>
        <div className={`notifications-dropdown ${slideNotifs ? "open" : ""}`}>
          <NotificationsDropdown 
            setSlideNotifs={setSlideNotifs}
          />
        </div>
        <div 
          className="nav-profile-container"
          onClick={(e) => {
            e.stopPropagation()
            setSlideProfile(prev => !prev)}
          }
        >
          <div className="img-container">
            <img src={myUser?.photoURL?.length ? myUser?.photoURL : placeholder} alt=""/>
          </div>
          <div className="text-info-container">
            <h5>{myUser?.firstName} {myUser?.lastName}</h5>
            <i className="fas fa-th"></i>
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
