
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
import network from "./assets/network.png"
import circle from "./assets/circle.png"
import hometext from "./assets/hometext.png"
import investtext from "./assets/investtext.png"
import you from "./assets/you.png"
import youtext from "./assets/youtext.png"
import iphoneLine from "./assets/line.png"


import IPhoneTime from '../IPhoneTime';
import NavBar from '../NavBar';



function PhoneComponent(props) {
    
   

    var data = !props.loadingComplete? props.data: null;
    var totalTransactions = data? data.totalTranscations : null;
    var numberOfClients = data?data.numberOfClients: null;
    var transactionsByIndustry = data?data.transactionsByIndustry: null;
    var topAccounts = data?data.topAcounts: null;

    var graph1 = data?forIndustryBar(transactionsByIndustry) : null;
    var graph2 = data?forAccountsBar(topAccounts) : null;

    
  return (

    <div className="phone">
        <IPhoneTime/>
        <NavBar/>

        
        
        <div className="mainContent">
        {
            props.startPressed && props.loadingComplete &&
            <div className="loadingBar">
            <CircularProgress size="10rem" />
            </div>
        }
        {props.startPressed && !props.loadingComplete && data
            &&
        
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
            <div className="bottomIcons">
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
        
    </div>
  );
}

export default PhoneComponent;