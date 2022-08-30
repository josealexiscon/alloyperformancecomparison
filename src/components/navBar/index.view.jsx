import React from 'react'
import "./style.css"


import Grid from '@mui/material/Grid';

import profile from "./assets/profile.png"


import navBarIcon from "./assets/navBar.png"
import nameOfCompany from "./assets/name.png"

import topBar from '../PhoneComponent/assets/topBarImage.png'

const NavBar = () => {
  return (
    <div className="navBar">
        {/* <img src={topBar} alt="topBar" className="topBar"/> */}
        <Grid container spacing={2} justifyContent="center"
        alignItems="center">
            <Grid item xs={2}>
                <img src={navBarIcon} className = "navBarIcon" alt="navBar" />
            </Grid>
            <Grid item xs={8}>
                <img src={nameOfCompany} alt="nameOfCompany" className="nameOfCompany"/>
            </Grid>
            <Grid item xs={2}>
                <img src={profile} alt="profile" />
            </Grid>
        </Grid>
    </div>
  )
}

export default NavBar