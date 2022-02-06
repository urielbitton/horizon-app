import React, { useContext } from 'react'
import HomeContainer from './HomeContainer'
import Sidebar from '../components/layout/Sidebar'
import './styles/AppContainer.css'
import './styles/DarkMode.css'
import { StoreContext } from "../store/store"

export default function AppContainer() {

  const { darkMode } = useContext(StoreContext)

  return (
    <div className={`app-container ${ darkMode ? "dark-app" : "" }`}>
      <Sidebar />
      <HomeContainer />
    </div>
  )
}
