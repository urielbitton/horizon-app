import React from 'react'
import './styles/NoAccess.css'
import noAccessImg from '../../assets/imgs/no-access.png'
import AppButton from "./AppButton"

export default function NoAccess(props) {

  const { proOnly } = props

  return (
    <div className="no-access-page">
      <div className="container">
      <img src={noAccessImg} alt=""/>
        <h4>Access Restricted</h4>
        <p>{ 
          proOnly ? 'This page can only be accessed by Pro Members' 
          : 'You do not have permission to access this page' 
        }</p>
        { proOnly &&
          <AppButton
            title="Get Pro"
            url="/get-pro"
          />
        }
      </div>
    </div>
  )
}
