import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

const UHYoutubeList = (props) => {
  console.log(props.uid);
  
  const handleButtonClick = (index) => {
    props.change(index)
  }

  return (
    <Box
      component="main"
      sx={{ bgcolor: "transparent", overflowY: 'auto'  }}
    >
      <TableContainer component={Paper} sx={{padding:'16px', overflow:`${props.overflow}`}}>
      <Typography sx={{ textAlign:"center"}} variant="h6">Your Favourite channels</Typography>

        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center" >Channel Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tabledata?.map((channel) => (
              <StyledTableRow key={channel.id}>

                <StyledTableCell align="center" component="th" scope="row">
                  {channel.id}
                </StyledTableCell>
                <StyledTableCell align="center">{channel.channel_title}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button  sx={{  backgroundColor: '#000000',}} variant="contained" endIcon={<ArrowDropDownIcon />}>Show complete list</Button>

    </Box>
    
  );
};

export default UHYoutubeList;
