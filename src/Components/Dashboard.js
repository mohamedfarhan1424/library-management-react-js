import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Customizedtables from "./Customizedtables";

function Dashboard() {
  const state = useSelector((state) => state);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [books,setBooks]=useState([]);
  const [rows,setRows]=useState([]);
  const [update,setUpdate]=useState("");

  

  

  

  const handleBooks=(response)=>{
    console.log(response);
    setBooks(response);
  }



  const handleUserBooks=(response)=>{
    setRows(response);

  }


  
    

  useEffect(()=>{
    dispatch({type:"BOOKS",payload:{books:books}})
    
  },[dispatch,books])



  useEffect(()=>{
    const url = `http://localhost:8080/books`
    const requestOptions = {
        method: 'GET',
    };
    fetch(url, requestOptions)
        .then(response =>response=response.json()).then((response)=>handleBooks(response))
        .catch(error => console.log('Fetch error', error))
  },[]);
  


  useEffect(()=>{
    const url = `http://localhost:8080/getbooktable/${state.username}`;
    const requestOptions = {
        method: 'GET',
    };
    fetch(url, requestOptions)
        .then(response =>response=response.json()).then((response)=>handleUserBooks(response))
        .catch(error => console.log('Fetch error', error))

    dispatch({type:"ROWS",payload:{nums:rows.length}});
    

    
  },[state.username,rows,dispatch]);

  

  
  


  const handleGetBook=(bookname,returndays)=>{
    const url = `http://localhost:8080/createbook`;
    const date=new Date();
    const buyDate=date.toDateString();
    const date2=new Date();
    date2.setDate(date2.getDate()+parseInt(returndays));
    const returnDate=date2.toDateString();
    setUpdate("get");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username:state.username,bookName:bookname,buyDate:buyDate,returnDate:returnDate}),
    };
    fetch(url, requestOptions)
        .then(response =>response=response.json()).then((response)=>console.log(response))
        .catch(error => console.log('Fetch error', error))

        
  
    
  }


  const handleReturnBook=(bookname)=>{
    const url=`http://localhost:8080/returnbook/${state.username}/${bookname}`;
    const requestOptions={
      method:"DELETE",
    };
    fetch(url,requestOptions)
    .then(response=>response.json()).then((response)=>console.log(response))
    .catch(error=>console.log('Fetch error',error))

    setUpdate("Return");

    
    
  }
  

  useEffect(()=>{
    setTimeout(() => {
      setUpdate("");
    }, 5000);
  },[update]);



  if(state.isAdmin){
    navigate('/admin');
    return (
      <>
      Your are a admin
      <a href='/admin'>admin</a>
      </>
    )
  }
  if (!state.isAuthenticated) {
    navigate("/");
    return (
      <>
        <p>You need to login</p>
        <a href="/">Login</a>
      </>
    );
  }
  return (
    <>
    <div>
    
    
    <div className="dashboard">
    
      <h2>Welcome {state.name}</h2><br/>
      <div>
         <h6>Books Brought by you</h6>
         <Customizedtables head1="Book Name" head2="Brought Date" head3="To Return Date" head4="Return" rows={rows} returnFunction={handleReturnBook}/>
      </div><br/>
      <div>
        <h6>Books in Library</h6>
        <Customizedtables head1="Book Name" head2="Author Name" head3="Get" head4={false} rows={books} getfunction={handleGetBook} />
      </div>
      
     </div>
     {update==="get" && (
         <div className="alert">
         <Alert severity="success">Book got successfully!</Alert>
         </div>
       )}
       {update==="Return"&&(
         <div className="alert">
         <Alert severity="success">Book is returned successfully!</Alert>
         </div>
       )}
       </div>
    </>
  );
}

export default Dashboard;
