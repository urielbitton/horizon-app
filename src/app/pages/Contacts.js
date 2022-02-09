import React, { useContext, useEffect, useState } from 'react'
import './styles/Contacts.css'
import AppTable from "../components/ui/AppTable"
import { AppSelect } from '../components/ui/AppInputs'
import AppButton from '../components/ui/AppButton'
import { contactHeaders } from "../data/contacts"
import { getContactsByUserID } from "../services/userServices"
import { StoreContext } from '../store/store'
import { convertFireDateToString } from '../utils/dateUtils'
import { useHistory } from "react-router-dom"

export default function Contacts() {

  const { myUser } = useContext(StoreContext)
  const [contacts, setContacts] = useState([])
  const [sort, setSort] = useState('')
  const history = useHistory()

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
      <div><h6>{convertFireDateToString(row.dateAdded)}</h6></div>
      <div className="action-icons small-flex">
        <i 
          className="far fa-video"
          onClick={() => history.push(`/video-call/test-id`)}
        ></i>
        <i className="far fa-phone"></i>
      </div>
    </div>
  })

  useEffect(() => {
    getContactsByUserID(myUser?.userID, setContacts, 25)
  },[myUser])

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
