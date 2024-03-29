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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
  "&:nth-of-type()": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const UHSongListFull = (props) => {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "transparent",
        margin: "auto",
        paddingTop: "10vh",
        overflowY: "auto",
        width: "100%",
        height: "100vh",
      }}
    >
      <TableContainer
        sx={{ padding: "16px" }}
        style={{ backgroundColor: "#0000" }}
      >
        <Typography
          sx={{ textAlign: "center" }}
          variant="h6"
          paddingBottom="16px"
        >
          Your most listened songs
        </Typography>
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
              <StyledTableRow
                key={Song.id}
                style={{ backgroundColor: "rgba(230, 224, 227, 0.51)" }}
              >
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
    </Box>
  );
};

export default UHSongListFull;
