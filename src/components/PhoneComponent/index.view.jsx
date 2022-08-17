
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import {forIndustryBar, forAccountsBar} from './index.data';

import Chart from "react-apexcharts";

import "./style.css"
import navBar from "./assets/navBar.png"
import name from "./assets/name.png"
import network from "./assets/network.png"
import profile from "./assets/profile.png"
import wifi from "./assets/wifi.png"
import Battery from "./assets/Battery.png"
import circle from "./assets/circle.png"
import hometext from "./assets/hometext.png"
import investtext from "./assets/investtext.png"
import you from "./assets/you.png"
import youtext from "./assets/youtext.png"
import iphoneLine from "./assets/line.png"



function PhoneComponent(props) {
    
   

    var data = !props.loadingComplete? props.data: null;
    var totalTransactions = !props.loadingComplete? data.totalTranscations : null;
    var numberOfClients = !props.loadingComplete?data.numberOfClients: null;
    var transactionsByIndustry = !props.loadingComplete?data.transactionsByIndustry: null;
    var topAccounts = !props.loadingComplete?data.topAcounts: null;

    var graph1 = !props.loadingComplete?forIndustryBar(transactionsByIndustry) : null;
    var graph2 = !props.loadingComplete?forAccountsBar(topAccounts) : null;

    
  return (

    <div className="phone">
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
                            <img src={Battery} alt="navBar" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        <div className="navBar">
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <img src={navBar} className = "navBarIcon" alt="navBar" />
                </Grid>
                <Grid item xs={8}>
                    <img src={name} alt="name" />
                </Grid>
                <Grid item xs={2}>
                    <img src={profile} alt="profile" />
                </Grid>
            </Grid>
        </div>

        
        
        
        <div className="mainContent">

        {
            props.startPressed && props.loadingComplete &&
            <div className="loadingBar">
            <CircularProgress />
            </div>
        }
        {props.startPressed && !props.loadingComplete && 
       
        
            <div className="loadingComplete">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                {totalTransactions}
                            </Typography>
                            <Typography variant="body2">
                                Total Transactions
                            </Typography>
                        </CardContent>
                        
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                {numberOfClients}
                            </Typography>
                            <Typography variant="body2">
                                Total Clients
                            </Typography>
                        </CardContent>
                        
                    </Card>
                </Grid>
            </Grid>
            <Card className = "firstGraph">
                <CardContent>
                    <Chart
                        options={graph1.options}
                        series={graph1.series}
                        type="bar"
                        />
                    </CardContent>        
            </Card>
            <Card className="secondGraph">
                <CardContent>
                    <Chart
                        options={graph2.options}
                        series={graph2.series}
                        type="bar"
                        />
                    </CardContent>        
            </Card>
            </div>
            }
        </div>
        
            
        <div className="bottomBar">
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <img src={circle} alt="home" /> <br/>
                    <img src={hometext} alt="hometext" />
                </Grid>
                <Grid item xs={4}>
                    <img src={network} alt="network" /><br/>
                    <img src={investtext} alt="investtext" />
                </Grid>
                <Grid item xs={4}>
                    <img src={you} alt="you" /><br/>
                    <img src={youtext} alt="youtext" />
                </Grid>
            </Grid>
        </div>
        <div className="iphoneBottomBar">
            <img src={iphoneLine} className="iphoneLine" alt="iphoneLine" />
        </div>
    </div>
  );
}

export default PhoneComponent;