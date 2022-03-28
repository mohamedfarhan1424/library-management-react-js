
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'

function UserTable({username}) {
    const [rows,setRows]=useState([]);
    const dispatch=useDispatch();
    const state=useSelector(state=>state);

    const handleUserBooks=(response)=>{
        setRows(response);
    }
    useEffect(()=>{
        const url = `http://localhost:8080/getbooktable/${username}`;
    const requestOptions = {
        method: 'GET',
    };
    fetch(url, requestOptions)
        .then(response =>response=response.json()).then((response)=>handleUserBooks(response))
        .catch(error => console.log('Fetch error', error))

    dispatch({type:"ROWS",payload:{nums:rows.length}});
    },[dispatch,username,rows]);
  return (
    <div>
        {state.nums>0&& (
        <table className="usertable">
            <tr className='userrow'>
                <th className='userhead'>Book Name</th>
                <th className='userhead'>Issued Date</th>
                <th className='userhead'>To Return Date</th>
            </tr>
            {rows && rows.map((row)=>(
                <tr className="userrow" key={row.user_id}>
                    <td className='userbody'>{row.bookName}</td>
                    <td className='userbody'>{row.buyDate}</td>
                    <td className='userbody'>{row.returnDate}</td>
                </tr>
            ))}
        </table>
        )}
        {state.nums===0 && (
            <p style={{color:"red"}}>This user does not have any books</p>
        )}
    </div>
  )
}

export default UserTable