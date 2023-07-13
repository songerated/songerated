import React from 'react'
import Stack from "@mui/material/Stack";
import { Box, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";



export const MovieCard = (props) => {
    return (
        <div style={{height:'100%', }}>
                <Stack direction="column" style={{ alignItems: 'center', height:'100%', justifyContent:'center' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: '60%', }}
                        style={{ borderRadius: '15px', margin: '16px', border:'2px solid #dadada', outline:'none', borderColor:'#303233', boxShadow:'0 0 10px #303233' }}
                        image={
                            "https://image.tmdb.org/t/p/original" + props.poster_path
                        }
                        alt="Movie Poster"
                    />
                    <Typography varient="h5"><b>{props.title}</b></Typography>
                    <Rating name="read-only" value={props.vote_average / 2} style={{ paddingTop: '8px', paddingBottom: '8px' }} />
                    <Typography variant='subtitle1'
                     style={{
                        textOverflow: "ellipsis",
                        wordWrap: "break-word",
                        overflow: "hidden",
                        maxHeight: "3.6em",
                        lineHeight: "1.8em",
                        textAlign: 'center',
                        paddingLeft:'32px',
                        paddingRight:'32px',
                        paddingBottom:'16px'
                    }}>{props.overview}</Typography>
                </Stack>
                
        </div>

    )
}
