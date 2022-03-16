import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const state=useSelector(state=>state);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    if(!state.isAuthenticated){
        navigate('/')
        return (
            <>
            <p>You need to login</p>
            <a href='/'>Login</a>
            </>
        )
    }
  return (
    <>
    <h1>Welcome {state.name}</h1>
    <p>Your number is {state.phoneno} Email: {state.email} Username: {state.username}</p>
    <button className="btn btn-primary" onClick={()=>dispatch({type:"LOGOUT"})}>Log Out</button>
    </>
  )
}

export default Dashboard