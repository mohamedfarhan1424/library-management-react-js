import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [phoneno,setPhoneno]=useState('');
    const [check, setCheck] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const handleSignup = (response) => {
        if (!response.usercreated) {
          setCheck(true);
        } else {
          setCheck(false);
          dispatch({
            type: "LOG_IN" ,
            payload: {
              name: name,
              email: email,
              username: username,
              isAuthenticated: response.usercreated,
              phoneno: phoneno,
            },
          });
          navigate("/dashboard");
        }
      };


    const handleSubmit=event=>{
        event.preventDefault();
        const url = 'http://localhost:8080/signup'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name,email,username, password,phoneno })
    };
    console.log("HEllo");
    fetch(url, requestOptions)
        .then(response =>response=response.json()).then((response)=>handleSignup(response))
        .catch(error => console.log('Form submit error', error))
    }
  return (
    <>
    <div className="centerdiv">
      <div>
        <h3>Sign up!</h3><br/>
    <form method="post">
        Name: <input type="text" name="name" value={name} onChange={event=>setName(event.target.value)} required/><br/><br/>
        Email: <input type="email" name="email" value={email} onChange={event=>setEmail(event.target.value)} required/><br/><br/>
        UserName: <input type="text" name="username" value={username} onChange={event=>setUsername(event.target.value)} required/><br/><br/>
        Password: <input type="password" name="password" value={password} onChange={event=>setPassword(event.target.value)} required/><br/><br/>
        Phone Number: <input type="text" name="phoneno" value={phoneno} onChange={event=>setPhoneno(event.target.value)} required/><br/><br/>
        <button onClick={handleSubmit} className="btn btn-primary">Sign Up</button><br/><br/>
    </form>

    {check && (
        <p style={{ color: "red" }}>
          There is already a user with this username.
        </p>
      )}

    <p>Having an Account?<a href='/'>Login</a></p>
    </div>
    </div>
    </>
  )
}

export default Signup