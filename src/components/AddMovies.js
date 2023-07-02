import React from "react";
import TextField from "@mui/material/TextField";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import { CardActionArea } from "@mui/material";
import axios from "axios";
import { useAuth } from "../contexts/authContexts";
import StepperComponent from "./StepperComponent";
import { grey } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "@mui/icons-material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import BackupIcon from "@mui/icons-material/Backup";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import Rating from "@mui/material/Rating";

const fetch = require("node-fetch");

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/temp3.png"})`,
    backgroundSize: "cover",
  },
  popoverRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&.MuiPopover-paper": {
      background: "transparent",
    },
  },
  card: {
    borderRadius: 5,
    margin:'8px',
    "&:hover": {
      backgroundColor: "#fff",
    },
    background: "rgba(255,255,255,1)",
  },
  cardMain: {
    borderRadius: theme.spacing(0),
  },
}));

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#6F7E8C",
            "--TextField-brandBorderHoverColor": "#24272b",
            "--TextField-brandBorderFocusedColor": "#000",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
            [`& fieldset`]: {
              borderRadius: 100,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },

      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

const SearchButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "rgba(0,0,0)",
  "&:hover": {
    backgroundColor: grey[700],
  },
  borderRadius: 100,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  color: "#000",
  backgroundColor: "#3fab4c",

  borderRadius: 100,
  borderColor: "#000",
}));

export default function AddMovies() {
  const [movies, setMovies] = useState({});
  const [selectedMovies, setSelectedMovies] = useState([]);
  const outerTheme = useTheme();

  const [selected, setSelected] = useState([]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = useAuth();

  const server_base_url = process.env.REACT_APP_SERVER_URL;
  const spotify_url = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  let token = window.localStorage.getItem("token");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const loadMovies = (event) => {
    setAnchorEl(event.currentTarget);

    const url =
      "https://api.themoviedb.org/3/search/movie?query=" +
      selected +
      "&include_adult=false&language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODFjZGMyMGYxNTY3YzQyYjdmY2ViMGRjMDU3YTFiOSIsInN1YiI6IjY0Nzc0YjU5MjU1ZGJhMDEyOWNlNDUwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZauR3is7yezF6WsiV35JPVrP0Zj_TRYfyaDASSoFRt0",
      },
    };
    console.log(selected);

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json);
      })
      .catch((err) => console.error("error:" + err));
  };

  const handleSubmit = () => {
    navigate("/addyoutubechannels");
  };

  useEffect(() => {
    console.log(movies.results);
  }, [movies]);

  return (
    <div className={classes.root}>
      <div style={{ padding: "32px" }}>
        <StepperComponent activeStep={2}></StepperComponent>
      </div>
      <div className="addMoviesSearch">
        <center>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: "rgba(255,255,255,0.5)",
              padding: "16px",
              marginBottom: "16px",
            }}
            style={{ width: "75%" }}
            alignContent="center"
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "rgba(0,0,0)" }}
              justifyContent="left"
              alignContent="left"
            >
              The next step is to tell us about your favourite movies.
              <br></br> No.of movies you add ∝ No. of matches we find for you
            </Typography>

            <center>
              <Stack
                sx={{ padding: "8px" }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Autocomplete
                  onChange={(event, value) => setSelected(value)}
                  freeSolo
                  id="combo-box-demo"
                  options={top100Films.map((option) => option.label)}
                  sx={{ width: "45%" }}
                  PaperComponent={({ children }) => (
                    <Paper
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        padding: "8px",
                        fontSize: "1.10em",
                        borderRadius: "100",
                        color: "#000",
                      }}
                    >
                      {children}
                    </Paper>
                  )}
                  renderInput={(params) => (
                    <ThemeProvider theme={customTheme(outerTheme)}>
                      <TextField
                        style={{ borderColor: "#000" }}
                        onChange={(event, value) =>
                          setSelected(event.target.value)
                        }
                        {...params}
                        label="Movie Name"
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            // this is necessary if you don't want to input value to be
                            // placed under the icon at the end
                            "&&&": { pr: "70px" },
                          },
                          endAdornment: (
                            <React.Fragment>
                              {params.InputProps.endAdornment}
                              <SearchButton
                                variant="contained"
                                onClick={loadMovies}
                                color="primary"
                                style={{ backgroundColor: "#000" }}
                                sx={{
                                  position: "absolute",
                                  right: 15,
                                }}
                                endIcon={<SearchIcon />}
                              >
                                Search
                              </SearchButton>
                            </React.Fragment>
                          ),
                        }}
                      />
                    </ThemeProvider>
                  )}
                />
              </Stack>
              <SubmitButton
                variant="contained"
                onClick={handleSubmit}
                size="large"
                endIcon={<BackupIcon />}
              >
                Submit
              </SubmitButton>
            </center>
          </Card>
        </center>

        <Popover
          id={id}
          open={open}
          onClick={handleClose}
          onClose={handleClose}
          anchorReference="none"
          classes={{
            root: classes.popoverRoot,
          }}
          sx={{
            ".MuiPopover-paper": {
              background: "transparent",
              boxShadow: "none",
            },
          }}
          style={{ width: "100%" }}
        >
          <center>
            <div style={{ width: "75%", padding:'16px', margin:'16px' }}>
              {movies.results?.map((i) => (
                <div key={i.id} className={classes.card}  
          >
                  <CardActionArea
                    onClick={(evt) => {
                      console.log(i.id);
                      selectedMovies.push(i);
                      console.log(selectedMovies);
                      axios
                        .post(server_base_url + "/addmovie", {
                          movie: i,
                          uid: currentUser.uid,
                        })
                        .then((response) => handleClose());
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent>
                          <Typography
                            component="div"
                            variant="h5"
                            style={{ textAlign: "left" }}
                          >
                            {i.original_title}
                          </Typography>
                          <Stack direction="row" justifyContent="space-between">
                          <Typography
                            variant="subtitle2"
                            color="text.primary"
                            component="div"
                            style={{ textAlign: "left", paddingTop:'8px' }}

                          >
                             {i.release_date}
                          </Typography>
                          <Rating name="read-only" value={i.vote_average} max={10} style={{paddingTop:'8px', paddingBottom:'8px'}} />

                          </Stack>
                          
                          
                          <Typography
                            variant="body1"
                            color="text.primary"
                            component="div"
                            sx={{ marginTop: "8px" }}
                            style={{
                              textOverflow: "ellipsis",
                              wordWrap: "break-word",
                              overflow: "hidden",
                              maxHeight: "9.6em",
                              lineHeight: "1.8em",
                              textAlign:'left'
                            }}
                          >
                            {i.overview}
                          </Typography>


                          
                        </CardContent>
                      </Box>

                      <CardMedia
                        component="img"
                        sx={{width:'20%'}}
                        image={
                          "https://image.tmdb.org/t/p/original" + i.poster_path
                        }
                        alt="Live from space album cover"
                      />
                      
                    </Stack>
                  </CardActionArea>
                </div>
              ))}
            </div>
          </center>
        </Popover>

        <div>
          {selectedMovies?.map((i) => (
            <Card key={i.id} className={classes.cardMain}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent>
                    <Typography component="div" variant="h5">
                      {i.original_title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                    >
                      Release Date: {i.release_date}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                    >
                      Popularity: {i.popularity}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      component="div"
                      sx={{ marginTop: "8px" }}
                    >
                      {i.overview}
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                      sx={{ marginTop: "8px" }}
                    >
                      Average Rating: {i.vote_average}
                    </Typography>
                  </CardContent>
                </Box>

                <CardMedia
                  component="img"
                  sx={{ width: 151, margin: "16px" }}
                  image={"https://image.tmdb.org/t/p/original" + i.poster_path}
                  alt="Live from space album cover"
                />
              </Stack>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },
  {
    label: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { label: "City of God", year: 2002 },
  { label: "Se7en", year: 1995 },
  { label: "The Silence of the Lambs", year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: "Life Is Beautiful", year: 1997 },
  { label: "The Usual Suspects", year: 1995 },
  { label: "Léon: The Professional", year: 1994 },
  { label: "Spirited Away", year: 2001 },
  { label: "Saving Private Ryan", year: 1998 },
  { label: "Once Upon a Time in the West", year: 1968 },
  { label: "American History X", year: 1998 },
  { label: "Interstellar", year: 2014 },
  { label: "Casablanca", year: 1942 },
  { label: "City Lights", year: 1931 },
  { label: "Psycho", year: 1960 },
  { label: "The Green Mile", year: 1999 },
  { label: "The Intouchables", year: 2011 },
  { label: "Modern Times", year: 1936 },
  { label: "Raiders of the Lost Ark", year: 1981 },
  { label: "Rear Window", year: 1954 },
  { label: "The Pianist", year: 2002 },
  { label: "The Departed", year: 2006 },
  { label: "Terminator 2: Judgment Day", year: 1991 },
  { label: "Back to the Future", year: 1985 },
  { label: "Whiplash", year: 2014 },
  { label: "Gladiator", year: 2000 },
  { label: "Memento", year: 2000 },
  { label: "The Prestige", year: 2006 },
  { label: "The Lion King", year: 1994 },
  { label: "Apocalypse Now", year: 1979 },
  { label: "Alien", year: 1979 },
  { label: "Sunset Boulevard", year: 1950 },
  {
    label:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { label: "The Great Dictator", year: 1940 },
  { label: "Cinema Paradiso", year: 1988 },
  { label: "The Lives of Others", year: 2006 },
  { label: "Grave of the Fireflies", year: 1988 },
  { label: "Paths of Glory", year: 1957 },
  { label: "Django Unchained", year: 2012 },
  { label: "The Shining", year: 1980 },
  { label: "WALL·E", year: 2008 },
  { label: "American Beauty", year: 1999 },
  { label: "The Dark Knight Rises", year: 2012 },
  { label: "Princess Mononoke", year: 1997 },
  { label: "Aliens", year: 1986 },
  { label: "Oldboy", year: 2003 },
  { label: "Once Upon a Time in America", year: 1984 },
  { label: "Witness for the Prosecution", year: 1957 },
  { label: "Das Boot", year: 1981 },
  { label: "Citizen Kane", year: 1941 },
  { label: "North by Northwest", year: 1959 },
  { label: "Vertigo", year: 1958 },
  {
    label: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { label: "Reservoir Dogs", year: 1992 },
  { label: "Braveheart", year: 1995 },
  { label: "M", year: 1931 },
  { label: "Requiem for a Dream", year: 2000 },
  { label: "Amélie", year: 2001 },
  { label: "A Clockwork Orange", year: 1971 },
  { label: "Like Stars on Earth", year: 2007 },
  { label: "Taxi Driver", year: 1976 },
  { label: "Lawrence of Arabia", year: 1962 },
  { label: "Double Indemnity", year: 1944 },
  {
    label: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { label: "Amadeus", year: 1984 },
  { label: "To Kill a Mockingbird", year: 1962 },
  { label: "Toy Story 3", year: 2010 },
  { label: "Logan", year: 2017 },
  { label: "Full Metal Jacket", year: 1987 },
  { label: "Dangal", year: 2016 },
  { label: "The Sting", year: 1973 },
  { label: "2001: A Space Odyssey", year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: "Toy Story", year: 1995 },
  { label: "Bicycle Thieves", year: 1948 },
  { label: "The Kid", year: 1921 },
  { label: "Inglourious Basterds", year: 2009 },
  { label: "Snatch", year: 2000 },
  { label: "3 Idiots", year: 2009 },
  { label: "Monty Python and the Holy Grail", year: 1975 },
];
