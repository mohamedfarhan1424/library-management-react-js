import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Admindashboard from "./Components/Admindashboard";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import Users from "./Components/Users";

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
        {state.isAdmin && (<button className="buttons"><a style={{color:"black",textDecoration:"none"}} href="/users">Users</a></button>)}
      <button className="buttons"><a style={{color:"black",textDecoration:"none"}} href="/profile">Profile</a></button>
      <button className="buttons"
      onClick={() => dispatch({ type: "LOGOUT" })}
    >
      Log Out
    </button>
    </div>
    )}
    
    </div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
         
          <Route exact path="/signup" element={<Signup/>}/>

          <Route exact path="/dashboard" element={<Dashboard/>}/>

          <Route exact path="/profile" element={<Profile/>}/>

          <Route exact path="/admin" element={<Admindashboard/>}/>

          <Route exact path="/users" element={<Users/>}/>
          
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
