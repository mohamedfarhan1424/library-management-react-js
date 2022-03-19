import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";

function App() {
  const state=useSelector(state=>state);
  const dispatch=useDispatch();
  return (
    <>
    <div>
    <div className="head">
    <h3>LIBRARY MANAGEMENT</h3>
    {state.isAuthenticated && (
      <div className="logout">
      <Button variant="contained"><a style={{color:"white",textDecoration:"none"}} href="/profile">Profile</a></Button>
      <Button variant="contained"
      onClick={() => dispatch({ type: "LOGOUT" })}
    >
      Log Out
    </Button>
    </div>
    )}

    </div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
         
          <Route exact path="/signup" element={<Signup/>}/>

          <Route exact path="/dashboard" element={<Dashboard/>}/>

          <Route exact path="/profile" element={<Profile/>}/>
          
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
