import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Library Management</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
         
          <Route exact path="/signup" element={<Signup/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
