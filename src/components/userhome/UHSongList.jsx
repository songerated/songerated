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
import { Button } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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

const UHSongList = (props) => {

  return (
    <Box
      component="main"
      sx={{ bgcolor: "transparent", margin: "auto", paddingTop: "10vh", overflowY: 'auto', }}
    >
      <TableContainer component={Paper} sx={{padding:'16px', overflow:`${props.overflow}`}}>
      <Typography sx={{ textAlign:"center"}} variant="h6">Your most listened songs</Typography>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Song Name</StyledTableCell>
              <StyledTableCell>Album</StyledTableCell>
              <StyledTableCell>Artist</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {props.tabledata?.map((Song) => (
              <StyledTableRow key={Song.id}>
                <StyledTableCell component="th" scope="row">
                  {Song.song_name}
                </StyledTableCell>
                <StyledTableCell>{Song.album_name}</StyledTableCell>
                <StyledTableCell>{Song.artist_name}</StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
      <Button sx={{  backgroundColor: '#000000',}} variant="contained" endIcon={<ArrowDropDownIcon />}>Show complete list</Button>

    </Box>
  );
};

export default UHSongList;
