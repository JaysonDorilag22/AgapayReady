
import React from 'react'
import { useSelector } from "react-redux";
import EmergencyReportForm from './EmergencyReportForm';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  return (
    <>

    <img src={currentUser.avatar}/>
    <div>{currentUser.firstname}</div>
    <div>{currentUser.lastname}</div>
    <div>{currentUser.role}</div>
    <EmergencyReportForm/>
    </>
    
  )
}