import React from 'react'
import { Router, Routes, Route, useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function TeamMember(props) {

    const navigate = useNavigate();

    const handleOnClick = () => {
        switch(props.github) {
            case 'aadityaguptaa': window.location.replace(`https://www.github.com/${props.github}`); break;
            case 'aprameya-l': window.location.replace(`https://www.github.com/${props.github}`); break;
            case 'Achaiah-CD' : window.location.replace(`https://www.github.com/${props.github}`); break;
            case 'deepthi-nanjunda' : window.location.replace(`https://www.github.com/${props.github}`); break;
            default: break;
        }
    }

  return (
    <div onClick={handleOnClick}>
        <center>
        <div className="col-md-4 animated fadeIn" key="1" style={{width:'75%', backgroundColor: "rgba(230,    224, 227, 0.21)"}}>
              <div className="card" style={{backgroundColor: "rgba(230,    224, 227, 0.21)"}}>
                <div className="card-body">
                    <center>
                  <div className="avatar">
                    <img
                      src={props.dp}
                      className="card-img-top"
                      alt=""
                    />
                  </div>
                
                  <h5 className="card-title">
                    {props.name}
                  </h5>
                  <p className="card-text">
                    {props.bio}
                    <br />
                    <br />
                    <GitHubIcon><b>github: {props.github}</b></GitHubIcon>
                  </p>
                  </center>
                </div>
              </div>
            </div>
            </center>
    </div>
  )
}
