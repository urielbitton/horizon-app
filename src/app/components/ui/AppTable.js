import React from 'react'
import './styles/AppTable.css'
import AppCard from './AppCard'

export default function AppTable(props) {

  const { title, sortSelect, actionBtn, headers, rows } = props

  return (
    <AppCard 
      className="app-table"
      padding="0"
    >
      <header className="header">
        <h4 className="title">{title}</h4>
        <div>
          {sortSelect}
          {actionBtn}
        </div>
      </header>
      <section className="body">
        <div className="table-head">
          {headers}
        </div>
        <div className="table-body">
          {rows}
        </div>
      </section>
    </AppCard>
  )
}
