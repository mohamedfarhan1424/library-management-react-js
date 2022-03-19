import { Breadcrumbs, Link } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import '../App.css'

function Profile() {
    const state=useSelector(state=>state);
    const navigate=useNavigate();
    if(!state.isAuthenticated){
        navigate('/');
        return(
            <p>Redirecting...</p>

        )
    }
  return (
    <div className="profile">
        <Breadcrumbs>
            <Link href='/dashboard'>Dashboard</Link>
            <Link aria-current="page">Profile</Link>
        </Breadcrumbs>

        <div className="carder">
            <h6>Name: </h6><p>{state.name}</p><br/>
            <h6>Email: </h6><p>{state.email}</p><br/>
            <h6>UserName: </h6><p>{state.username}</p><br/>
            <h6>Phone No: </h6><p>{state.phoneno}</p><br/>
            <h6>No.of.Books brought by you: </h6><p>{state.nums}</p>
        </div>
    </div>
  )
}

export default Profile