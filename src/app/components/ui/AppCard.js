import React from 'react'
import './styles/AppCard.css'

export default function AppCard({children, padding='15px', className}) {

  return (
    <div 
      className={`app-card ${className}`}
      style={{ padding }}
    >
      {children}
    </div>
  )
}
