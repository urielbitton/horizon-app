import React from 'react'
import './styles/AppButton.css'
import { Link } from "react-router-dom"

export default function AppButton(props) {

  const { title, url, leftIcon, rightIcon, onClick, className,
    buttonType, disabled, fullWidth, activeShadow } = props

  return (
    url ?
    <Link 
      to={url ?? '#'} 
      style={{width: fullWidth ? '100%' : 'auto'}}
    >
      <button 
        className={`
          app-button 
          ${className ?? ""} 
          ${buttonType}
          ${disabled ? "disabled" : ''}
          ${activeShadow ? 'active-shadow' : ''}
        `}
        onClick={() => onClick && onClick()}
      >
        { leftIcon && <i className={`${leftIcon} left-icon`}></i> }
        { title }
        { rightIcon && <i className={`${rightIcon} right-icon`}></i> }
      </button>
    </Link> :
    <button 
      className={`
        app-button 
        ${className ?? ""} 
        ${buttonType}
        ${disabled ? "disabled" : ''}
        ${activeShadow ? 'active-shadow' : ''}
      `}
      onClick={() => onClick && onClick()}
    >
      { leftIcon && <i className={`${leftIcon} left-icon`}></i> }
      { title }
      { rightIcon && <i className={`${rightIcon} right-icon`}></i> }
    </button>
  )
}
