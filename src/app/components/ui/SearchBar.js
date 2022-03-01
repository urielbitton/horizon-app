import React from 'react'
import './styles/SearchBar.css'

export default function SearchBar(props) {

  const { width, height, value, onChange, showIcon, 
    placeholder } = props

  return (
    <div 
      className="searchbar"
      style={{width, height}}
    >
      <input 
        placeholder={placeholder} 
        onChange={() => onChange} 
        value={value}
      />
      {
        showIcon &&
        <div className="icon-container">
          <i className="fal fa-search"></i>
        </div>
      }
    </div>
  )
}
