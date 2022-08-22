import React from 'react'
import "./style.css"


import Grid from '@mui/material/Grid';

import profile from "./assets/profile.png"


import navBarIcon from "./assets/navBar.png"
import nameOfCompany from "./assets/name.png"


const NavBar = () => {
  return (
    <div className="navBar">
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <img src={navBarIcon} className = "navBarIcon" alt="navBar" />
            </Grid>
            <Grid item xs={8}>
                <img src={nameOfCompany} alt="nameOfCompany" />
            </Grid>
            <Grid item xs={2}>
                <img src={profile} alt="profile" />
            </Grid>
        </Grid>
    </div>
  )
}

export default NavBar