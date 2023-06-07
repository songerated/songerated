import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const server_base_url = process.env.REACT_APP_SERVER_URL;

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

const UHMovieList = (props) => {
  var [userMovieList, setUserMovieList] = useState([]);
  console.log(props.uid);
  useEffect(() => {
    axios
      .get(server_base_url + "/usermovies", {
        params: {
          uid: `${props.uid}`,
        },
      })
      .then((res) => {
        setUserMovieList(res.data);
        console.log(res);
      });
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">Movie Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userMovieList?.map((movie) => (
              <StyledTableRow key={movie.id}>
                <StyledTableCell component="th" scope="row">
                  {movie.id}
                </StyledTableCell>
                <StyledTableCell >{movie.Name}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UHMovieList;
