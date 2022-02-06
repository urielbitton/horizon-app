import React, { useContext, useState } from 'react'
import { StoreContext } from "../../store/store"
import './styles/NotificationsDropdown.css'
import { Link } from "react-router-dom"
import NotificationElement from "./NotificationElement"

export default function NotificationsDropdown(props) {

  const { myUser } = useContext(StoreContext)
  const { viewAll, setSlideNotifs } = props
  const [allNotifs, setAllNotifs] = useState([])
  
  const allNotifsRender = allNotifs?.map((notif,i) => {
    return <NotificationElement notif={notif} key={i} />
  })


  return (
    <>
      <header>
        <h4>Notifications</h4>
        { 
          viewAll ? 
          <small>
            <Link 
              to="/notifications" 
              onClick={() => setSlideNotifs(false)}
            >
              View All
            </Link>
          </small> : 
          ""
        }
      </header>
      <section className="hidescroll">
        {allNotifsRender}
      </section>
    </>
  )
}
