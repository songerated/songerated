import React from 'react'

export default function TeamMember(props) {
  return (
    <div>
        <center>
        <div className="col-md-4 animated fadeIn" key="1">
              <div className="card">
                <div className="card-body">
                    <center>
                  <div className="avatar">
                    <img
                      src="../../assets/0.png"
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
                    <span className="phone"><b>github: {props.github}</b></span>
                  </p>
                  </center>
                </div>
              </div>
            </div>
            </center>
    </div>
  )
}
