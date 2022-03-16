import React, { useState } from 'react'



function Home() {

  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const handleSubmit =event => {
    event.preventDefault();
  
    const url = 'http://localhost:8080/login'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    console.log("HEllo");
    fetch(url, requestOptions)
        .then(response =>response=response.json()).then(response=>console.log(response.login))
        .catch(error => console.log('Form submit error', error))
  };
  return (
    <>
   
    
    <form onSubmit={handleSubmit} method="post">
        Username: <input type="text" name="username" value={username} onChange={(event)=>setUsername(event.target.value)} required/><br/><br/>
        Password: <input type="password" name="password" value={password} onChange={(event)=>setPassword(event.target.value)} required/><br/><br/>
        <input type="submit" value="Login"/><br/><br/>
    </form>

    <p>Don't have an account?<a href='/signup'>create account</a></p>
    </>
  )
}

export default Home