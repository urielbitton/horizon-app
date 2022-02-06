import React, { useContext, useEffect, useState } from 'react'
import './styles/Sidebar.css'
import { menuLinks } from '../../data/menuLinks'
import MenuLink from './MenuLink'
import { useLocation } from 'react-router'
import { StoreContext } from '../../store/store'
import { useHistory } from "react-router-dom"

export default function Sidebar() {

  const {myUser, openSidebar, setOpenSidebar} = useContext(StoreContext)
  const [tabOpen, setTabOpen] = useState(false)
  const location = useLocation()
  const history = useHistory()

  const menuRender = menuLinks
  ?.filter(x => (myUser?.isInstructor ? x : !x.requireInstructor)  && (myUser?.isAdmin ? x : !x.requireAdmin))
  .map((link,i) => {
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
            <h3>Sidebar</h3>
          </div>
          <div className="menu">
            {menuRender}
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
