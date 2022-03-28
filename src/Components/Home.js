import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (response) => {
    if (!response.login) {
      setCheck(true);
    } 
    else if(response.admin){
      setCheck(false);
      dispatch({type:"ADMIN",payload:{name: response.name,
        email: response.email,
        username: response.username,
        isAuthenticated: response.login,
        phoneno: response.phoneno}})

        navigate('/admin');
    }
    else {
      setCheck(false);
      dispatch({
        type: "LOG_IN" ,
        payload: {
          name: response.name,
          email: response.email,
          username: response.username,
          isAuthenticated: response.login,
          phoneno: response.phoneno,
        },
      });
      navigate("/dashboard");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const url = "http://localhost:8080/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    console.log("HEllo");
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .then((response) => handleLogin(response))
      .catch((error) => console.log("Form submit error", error));
  };
  return (
    <>
    <div className="centerdiv">
      <div className="carder">
      <form method="post">
        Username:{" "}
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <br />
        <br />
        Password:{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <br />
        <br />
        <button onClick={handleSubmit} className="btn btn-primary">
          Log In
        </button>
        <br />
        <br />
      </form>
      {check && (
        <p style={{ color: "red" }}>
          Oops! Crendiatials entered is wrong! Try Again.
        </p>
      )}

      <p>
        Don't have an account?<a href="/signup">create account</a>
      </p>
      </div>
      </div>
    </>
  );
}

export default Home;
