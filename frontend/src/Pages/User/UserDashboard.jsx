import React from 'react'
import EmergencyReportForm from './EmergencyReportForm'
import GuidelineCollections from '../Common/GuidelineCollections'
import ContactsCollection from '../Common/ContactsCollections'

export default function UserDashboard() {
  return (
    <div className='p-5 grid grid-cols-1 lg:grid-cols-3'>
    <div className='bg-slate-200 shadow-xl'>
      <GuidelineCollections/>
      </div>
      <div>
      <EmergencyReportForm/>
      </div>
      <div>
      <ContactsCollection/>
      </div>
    </div>
  )
}
