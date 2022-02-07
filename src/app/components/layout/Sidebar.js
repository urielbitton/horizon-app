import React, { useContext, useEffect, useState } from 'react'
import './styles/Sidebar.css'
import { menuLinks, footerLinks } from '../../data/menuLinks'
import MenuLink from './MenuLink'
import { useLocation } from 'react-router'
import { StoreContext } from '../../store/store'
import { useHistory } from "react-router-dom"
import whiteLogo from '../../assets/imgs/white-logo.png'
import AppButton from '../ui/AppButton'

export default function Sidebar() {

  const {myUser, openSidebar, setOpenSidebar} = useContext(StoreContext)
  const [tabOpen, setTabOpen] = useState(false)
  const location = useLocation()
  const history = useHistory()

  const topMenuRender = menuLinks
  ?.filter(x => (myUser?.isAdmin ? x : !x.requireAdmin))
  .map((link,i) => {
    return <MenuLink 
      link={link} 
      tabOpen={tabOpen}
      setTabOpen={setTabOpen}
      i={i} 
      key={i} 
    />
  })

  const bottomMenuRender = footerLinks?.map((link,i) => {
    return <MenuLink 
      link={link} 
      tabOpen={tabOpen}
      setTabOpen={setTabOpen}
      i={i} 
      key={i} 
    />
  })

  useEffect(() => {
    if(location.pathname.includes('/courses')) {
      setTabOpen(true)
    }
    else {
      setTabOpen(false)
    }
    setOpenSidebar(false)
  },[location])

  return (
    <div 
      className={`sidebar ${openSidebar ? "open" : ""}`} 
      onClick={(e) => e.stopPropagation()}
    >
      <div className="sidebar-scroll hidescroll">
        <div className="top">
          <div className="logo-container">
            <img src={whiteLogo} alt="" />
            <h3>Horizon</h3>
          </div>
          <div className="menu">
            {topMenuRender}
          </div>
          <AppButton 
            title="Start a Call"
            secondaryBtn
            leftIcon="fal fa-phone-plus"
            onClick={() => null}
            fullWidth
          />
        </div>
        <div className="bottom">
          <div className="menu">
            {bottomMenuRender}
          </div>
        </div>
      </div>
      <div 
        className="close-container" 
        onClick={() => setOpenSidebar(false)}
      >
        <i className="fal fa-times"></i>
      </div>
    </div>
  )
}
