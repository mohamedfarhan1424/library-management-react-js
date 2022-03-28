import { Breadcrumbs, Link } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Customizedtables from './Customizedtables'
import '../App.css'

function Users() {
    const navigate=useNavigate();
    const state=useSelector(state=>state);
    const [rows,setRows]=useState([]);

    const handleUser=(response)=>{
        console.log(response);
        setRows(response);
    }

    useEffect(()=>{
        const url = `http://localhost:8080/getusers`;
    const requestOptions = {
        method: 'GET',
    };
    fetch(url, requestOptions)
        .then(response =>response=response.json()).then((response)=>handleUser(response))
        .catch(error => console.log('Fetch error', error))
    },[])

    if(!state.isAdmin){
        navigate('/');
        return (
            <>
            You have no access to this page<br/>
            {!state.isAuthenticated &&<a href='/'>Login</a>}
            {state.isAuthenticated && <a href='/dashboard'>Dashboard</a>}
            </>
        )
    }
  return (
    <div className='profile'>
    <br/>
    <Breadcrumbs>
        <Link href="/admin">Dashboard</Link>
        <Link aria-current="page">Users</Link>
      </Breadcrumbs>
      <br/>
      <br/>

    <Customizedtables head1="Users" head2="Details" head4={false} rows={rows}/>
    </div>
  )
}

export default Users