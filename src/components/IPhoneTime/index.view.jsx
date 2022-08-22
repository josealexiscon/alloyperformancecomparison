import React from 'react'
import Grid from '@mui/material/Grid';
import "./style.css"


import wifi from "./assets/wifi.png"
import Battery from "./assets/Battery.png"
import network from "./assets/network.png"


const IPhoneTime = () => {
  return (
    <div className="iphoneTime">
        <Grid container spacing={2}>
            <Grid item xs={9}>
            <div className="time">7:00 PM</div>
            </Grid>
            <Grid item xs={3}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <img src={wifi} alt="wifi" />
                    </Grid>
                    <Grid item xs={4}>
                        <img src={network} alt="network" />
                    </Grid>
                    <Grid item xs={4}>
                        <img src={Battery} alt="battery" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

export default IPhoneTime