
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


import {topIndustriesValues, topAccountsValues} from './index.data';

import Chart from "react-apexcharts";

import "./style.css"
import network from "./assets/network.png"
import circle from "./assets/circle.png"
import hometext from "./assets/hometext.png"
import investtext from "./assets/investtext.png"
import you from "./assets/you.png"
import youtext from "./assets/youtext.png"
import iphoneLine from "./assets/line.png"
import bottomBar from "./assets/bottomBarPicture.png"


import IPhoneTime from '../IPhoneTime';
import NavBar from '../NavBar';
import MainInformation from '../MainInformation';



function PhoneComponent(props) {
    
   

    var data = !props.loadingComplete? props.data: null;
    var totalTransactions = data? data.totalTranscations : null;
    var numberOfClients = data?data.numberOfClients: null;
    var transactionsByIndustry = data?data.transactionsByIndustry: null;
    var topAccountsList = data?data.topAcounts: null;
    

    var topMovers = data?topIndustriesValues(transactionsByIndustry):null;


    var topAccounts = data?topAccountsValues(topAccountsList):null;

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
                <MainInformation totalTransactions = {totalTransactions} numberOfClients = {numberOfClients} topMovers = {topMovers} topAccounts = {topAccounts}/>
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
            <div className="imageContainer"><img src={bottomBar} alt="bottomBar" className="bottomBarImage"/></div>
                
            <div className="iphoneBottomBar">
                <img src={iphoneLine} className="iphoneLine" alt="iphoneLine" />
            </div>
        </div>
        
    </div>
  );
}

export default PhoneComponent;