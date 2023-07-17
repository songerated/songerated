import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

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

const RecommendedSongsTable = (props) => {
  console.log(props.recommendedSongs)
  return (
      <TableContainer style={{ backgroundColor: "#0000" }}
      >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Track Name</StyledTableCell>
                  <StyledTableCell align="right">Artists</StyledTableCell>
                  <StyledTableCell align="right">Album</StyledTableCell>
                  <StyledTableCell align="right">Popularity</StyledTableCell>
                  <StyledTableCell align="right">Explicit</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.recommendedSongs?.map((track) => (
                  <StyledTableRow key={track.id}                 style={{ backgroundColor: "rgba(230, 224, 227, 0.91)" }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {track.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {track.album.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {track.popularity}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {track.explicit.toString()}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
  )
}

export default RecommendedSongsTable
