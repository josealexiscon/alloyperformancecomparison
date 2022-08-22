
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
import MainInformation from '../MainInformation';



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
            {props.startPressed && props.loadingComplete &&
                <div className="loadingBar">
                    <CircularProgress size="10rem" />
                </div>
            }
            {props.startPressed && 
                !props.loadingComplete && 
                data &&
                <MainInformation totalTransactions = {totalTransactions} numberOfClients = {numberOfClients} graph1={graph1} graph2 = {graph2}/>
            }
            {props.startPressed && 
                !props.loadingComplete && 
                !data &&
                <div>
                    Error occured. Please try again.
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