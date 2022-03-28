import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";
import UserTable from "./UserTable";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Customizedtables({ head1, head2, head3, head4, rows,getfunction,returnFunction,removefunction }) {

  const [open, setOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState("");
  const [selectedAuthor, setSelectedAuthor] = React.useState("");
  const [returndays,setReturnDays]=React.useState(0);
  const [open2,setOpen2]=React.useState(false);
  const [open3,setOpen3]=React.useState(false);
  const [selectedUser,setSelectedUser]=React.useState("");
  const state=useSelector(state=>state);
  
  const handleUserOpen=(username)=>{
    setSelectedUser(username);
    setOpen3(true);
  }

  const handleUserClose=()=>{
    setOpen3(false);
  }

    const handleClickOpen =(index) => {
      console.log("In open")
      console.log(state.books);
      setSelectedBook(state.books[index].bookname);
      setSelectedAuthor(state.books[index].authorname);
      setOpen(true);
    };
    const handleClickOpenRemove =(index) => {
      
      setSelectedBook(state.books[index].bookname);
      setSelectedAuthor(state.books[index].authorname);
      setOpen2(true);
    };
  
    

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseRemove = () => {
    setOpen2(false);
  };
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{head1}</StyledTableCell>
            <StyledTableCell align="right">{head2}&nbsp;</StyledTableCell>
            {head1!=="Users"&&(<StyledTableCell align="right">{head3}&nbsp;</StyledTableCell>)}
            {head4&& (
              <StyledTableCell align="right">{head4}&nbsp;</StyledTableCell>
            )}
            {/* <StyledTableCell align="right"></StyledTableCell> */}
          </TableRow>
        </TableHead>
        {head4&& (
          <TableBody>
            {rows &&
              rows.map((row) => (
                <StyledTableRow key={row.user_id}>
                  <StyledTableCell component="th" scope="row">
                    {row.bookName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.buyDate}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.returnDate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button className="loopbutton" onClick={()=>returnFunction(row.bookName)}>Return</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        )}
        {!head4 && head1!=="Users"&& (
          <TableBody>
            {rows &&
              rows.map((row,index) => (
                <StyledTableRow key={row.book_id}>
                  <StyledTableCell component="th" scope="row">
                    {row.bookname}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.authorname}
                  </StyledTableCell>
                  {head3==="Get" && (<StyledTableCell align="right">
                    <button className="loopbutton" onClick={()=>handleClickOpen(index)}>Get</button>
                  </StyledTableCell>)}
                  {head3==="Remove" && (<StyledTableCell align="right">
                    <button className="loopbutton" onClick={()=>handleClickOpenRemove(index)}>Remove</button>
                  </StyledTableCell>)}
                </StyledTableRow>
              ))}
              
          </TableBody>
        )}
        {!head4 && head1==="Users"&& (
          <TableBody>
            {rows &&
              rows.map((row) => (
                <StyledTableRow key={row.user_id}>
                  <StyledTableCell component="th" scope="row">
                    {row.username}
                  </StyledTableCell>
                  
                  <StyledTableCell align="right">
                    <button onClick={()=>handleUserOpen(row.username)} className="btn btn-primary">Details</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              
          </TableBody>
        )}

      </Table>
    </TableContainer>
    <div>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Get Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selected Book: {selectedBook}<br/>
            Author Name: {selectedAuthor}<br/>
          </DialogContentText>
          Number of days to return: <input type="number" name="returndays" value={returndays} onChange={(e)=>setReturnDays(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{getfunction(selectedBook,returndays);handleClose();}}>Get Book</Button>
        </DialogActions>
      </Dialog>
    </div>
    <div>
    <Dialog open={open2} onClose={handleCloseRemove}>
        <DialogTitle>Remove Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selected Book: {selectedBook}<br/>
            Author Name: {selectedAuthor}<br/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemove}>Cancel</Button>
          <Button onClick={()=>{removefunction(selectedBook,selectedAuthor);handleCloseRemove();}}>Remove</Button>
        </DialogActions>
      </Dialog>
    </div>
    <div>
    <Dialog open={open3} onClose={handleUserClose} fullWidth maxWidth='lg'>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Name: {selectedUser}<br/>
            Total Number of Books : {state.nums}<br/><br/>
          </DialogContentText>
          <UserTable username={selectedUser}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}
