import React, { useState } from 'react'
import './styles/Contacts.css'
import AppTable from "../components/ui/AppTable"
import { AppSelect } from '../components/ui/AppInputs'
import AppButton from '../components/ui/AppButton'
import { contacts, contactHeaders } from "../data/contacts"

export default function Contacts() {

  const [sort, setSort] = useState('')

  const sortOptions = [
    {name: 'Date Added', value: 'date-added'},
    {name: 'First Name', value: 'first-name'},
    {name: 'Last Name', value: 'last-name'},
    {name: 'Email', value: 'email'},
    {name: 'Phone', value: 'phone'},
  ]

  const headersRender = contactHeaders?.map((header, i) => {
    return <h5 
      key={i}
      className={`${header.flex === 'small' ? 'small-flex' : header.flex === 'medium' ? 'medium-flex' : 'long-flex'}`}
    >
      {header.name}
    </h5>
  })
      
  const rowsRender = contacts?.map((row, i) => {
    return <div 
      key={i}
      className="row-item"
    >
      <div className="profile-img-title">
        <img src={row.photoURL} alt="" />
        <h6>{row.name}</h6>
      </div>
      <div className="small-flex"><h6>{row.leadScore}</h6></div>
      <div><h6>{row.email}</h6></div>
      <div><h6>{row.phone}</h6></div>
      <div><h6>{row.dateAdded}</h6></div>
      <div className="action-icons small-flex">
        <i className="far fa-video"></i>
        <i className="far fa-phone"></i>
      </div>
    </div>
  })

  return (
    <div className="contacts-page">
      <AppTable
        title="Contacts"
        sortSelect={
          <AppSelect 
            options={sortOptions}
            title="Sort by:"
            onChange={(e) => setSort(e.target.value)}
            value={sort}
          />
        }
        actionBtn={
          <AppButton
            title="Add"
            rightIcon="fal fa-plus"
            gradientBtn
            activeShadow
          />
        }
        headers={headersRender}
        rows={rowsRender}
      />
    </div>
  )
}
