import React, { useContext, useEffect } from 'react'
import './styles/HomeContainer.css'
import Navbar from '../components/layout/Navbar'
import { Route, Switch } from 'react-router'
import { StoreContext } from '../store/store'
import ErrorPage from "../pages/ErrorPage"
import Home from '../pages/Home'

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
          <Route exact path="*" component={ErrorPage} />
        </Switch>
      </div>
    </div>
  )
}
