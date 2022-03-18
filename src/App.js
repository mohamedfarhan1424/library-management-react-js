import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
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
      <button
      className="btn btn-primary"
      onClick={() => dispatch({ type: "LOGOUT" })}
    >
      Log Out
    </button>
    )}

    </div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
         
          <Route exact path="/signup" element={<Signup/>}/>

          <Route exact path="/dashboard" element={<Dashboard/>}/>
          
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
