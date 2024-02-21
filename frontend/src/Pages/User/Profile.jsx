
import React from 'react'
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  return (
    <>

    <img src={currentUser.avatar}/>
    <div>{currentUser.firstname}</div>
    <div>{currentUser.lastname}</div>
    <div>{currentUser.role}</div>
    </>
    
  )
}