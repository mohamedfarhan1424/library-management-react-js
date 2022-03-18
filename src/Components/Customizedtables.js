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

export default function Customizedtables({ head1, head2, head3, head4, rows,getfunction,returnFunction }) {

  const [open, setOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState("");
  const [selectedAuthor, setSelectedAuthor] = React.useState("");
  const [returndays,setReturnDays]=React.useState(0);
  const state=useSelector(state=>state);
  

    const handleClickOpen =(index) => {
      console.log("In open")
      console.log(state.books);
      setSelectedBook(state.books[index].bookname);
      setSelectedAuthor(state.books[index].authorname);
      setOpen(true);
    };
  

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{head1}</StyledTableCell>
            <StyledTableCell align="right">{head2}&nbsp;</StyledTableCell>
            <StyledTableCell align="right">{head3}&nbsp;</StyledTableCell>
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
                    <button className="btn btn-info" onClick={()=>returnFunction(row.bookName)}>Return</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        )}
        {!head4 && (
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
                  <StyledTableCell align="right">
                    <button className="btn btn-info" onClick={()=>handleClickOpen(index)}>Get</button>
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
    </>
  );
}
