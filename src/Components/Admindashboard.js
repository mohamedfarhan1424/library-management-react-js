import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import Customizedtables from './Customizedtables';

function Admindashboard() {



    const [books,setBooks]=useState([]);
    const [open,setOpen]=useState(false);
    const [bookname,setBookname]=useState("");
    const [authorname,setAuthorname]=useState("");
    const [update,setUpdate]=useState("");
    const dispatch=useDispatch();


    const handleClickOpen =() => {
        
        setOpen(true);
      };

  const handleClose = () => {
    setOpen(false);
  };

    const handleBooks=(response)=>{
        console.log(response);
        setBooks(response);
      }

      const handleAdd=()=>{
        const url = `http://localhost:8080/addbook`;
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({bookname:bookname,authorname:authorname}),
          };
          fetch(url, requestOptions)
              .then(response =>response=response.json()).then((response)=>console.log(response))
              .catch(error => console.log('Fetch error', error))

              setUpdate("add")
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

            
      },[update]);


      const handleRemoveBook=(selectedBook,selectedAuthor)=>{
        const url=`http://localhost:8080/deletebook/${selectedBook}/${selectedAuthor}`
        const requestOptions = {
          method: 'DELETE',
      };
      fetch(url, requestOptions)
          .then(response =>response=response.json())
          .catch(error => console.log('Fetch error', error))

          setUpdate("Remove");
  
      }

      useEffect(()=>{
        setTimeout(() => {
          setUpdate("");
        }, 5000);
      },[update]);
    
    const state=useSelector(state=>state);
    const navigate=useNavigate();

    if(!state.isAdmin){
        navigate('/dashboard');
        return (
            <>
            You have no access to this page
            {state.isAuthenticated && (<a href='/dashboard'>Dashboard</a>)}
            {!state.isAuthenticated && (<a href='/'>Login</a>)}
            </>
        )
    }
  return (
    <>
    <div className="dashboard">
    
    <h2>Welcome {state.name}</h2><br/>

    <div>
        <div className='admin'>
        <h5>Books in Library</h5>
        <button className='btn btn-primary' onClick={()=>handleClickOpen()}>Add Books</button>
        </div>
    <Customizedtables head1="Book Name" head2="Author Name" head3="Remove" head4={false} rows={books} removefunction={handleRemoveBook}/>
    </div>
    </div>
    <div>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details of the book
          </DialogContentText>
          Book Name: <input type="text" name="bookname" value={bookname} onChange={(e)=>setBookname(e.target.value)}/><br/><br/>
          Author Name: <input type="text" nme="authorname" value={authorname} onChange={(e)=>setAuthorname(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{handleClose();handleAdd();}}>Add Book</Button>
        </DialogActions>
      </Dialog>
    </div>
    {update==="add"&&(
         <div className="alert">
         <Alert severity="success">Book is added successfully!</Alert>
         </div>
       )}
       {update==="Remove"&&(
         <div className="alert">
         <Alert severity="success">Book is removed successfully!</Alert>
         </div>
       )}
    </>
  )
}

export default Admindashboard