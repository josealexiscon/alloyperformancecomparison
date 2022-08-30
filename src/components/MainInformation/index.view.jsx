import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReactApexChart from "react-apexcharts";
import "./style.css";

import CircularProgress from '@mui/material/CircularProgress';

import { totalFormatter, baFormatter, stockChartData } from './index.data';

import downArrow from '../PhoneComponent/assets/downArrow.png'
import upArrow from '../PhoneComponent/assets/upArrow.png'


const MainInformation = (props) => {
    const totalTransactions = props.totalTransactions;
    const numberOfClients = props.numberOfClients;

    const topMovers = props.topMovers;
    const topAccounts = props.topAccounts;

    const mapToTicker = (name)=>{
        
        const map1 = {
            'de Havilland Financial Services': 'CRBN',
            'a&bé bridal shop seattle': 'BNL',
            'elect energy':'AGT',
            'deVere France':'SRNX',
            'cambridge coaching and consulting services':'CCCS'
        };
        if(map1[name]!=null) return map1[name];
        return 'NTH';
    }

    const topAccountsDisplay = (listOfAccounts) =>{
        return listOfAccounts.map(eachItem=>{
            return <div className="topMoversList">

                <Grid container >
                    <Grid item xs={5}>
                        <div className="eachItemAccount">
                            <span className="smallIcon" style={{backgroundColor: eachItem.colorValue}}>&nbsp;</span>
                            {mapToTicker(eachItem.account)}
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="eachItemValue">
                            {eachItem.value}
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        {eachItem.percentage > 15 && 
                        <div className="moveUpPercent">
                            <img src={upArrow} alt="upArrow" />
                            {eachItem.percentage.toFixed(2)}%
                        </div>}
                        {eachItem.percentage <= 15 && 
                        <div className="moveDownPercent">
                            <img src={downArrow} alt="downArrow" />
                            {eachItem.percentage.toFixed(2)}%
                        </div>}
                        
                    </Grid>
                </Grid></div>
        })
    }


    const IndustryDisplay = (listOfIndustryValues) =>{
        return listOfIndustryValues.map(eachItem=>{
            return <div className = "eachCard">
            <Grid container >
                <Grid item xs={2}>
                    <CircularProgress variant="determinate" value={eachItem.value} />

                </Grid>
                <Grid item xs={6}>
                    <div className="eachIndustryDetail">
                    <div className="nameOfIndustry">{eachItem.account}</div>
                    <div className="percentageValue">{eachItem.value.toFixed(2)}% of your total</div>
                    </div>
                    
                </Grid>
            </Grid>
        </div>
        })
    }

  return (
    <div className="loadingComplete">
        <div className="myPortfolioText">
            <Typography variant="h6">
                My Portfolio
            </Typography>
        </div>
        <hr/>
        <div className="topNumbers">
            <Grid container>
                <Grid item xs={3}>
                    <div className="totalSessions">
                        <Typography variant="h5">
                            {totalFormatter(totalTransactions)}
                        </Typography>   
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="baPercent">
                        <img src={upArrow} alt="up arrow" />
                        {baFormatter(totalTransactions,numberOfClients)}
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className="numberOfUsers">
                            +{numberOfClients}.23
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className="today">today</div>
                </Grid>
            </Grid>
        </div>
        <div className="asOfDate">
            As of Sep 13, 1:15 PM EST USD
        </div>
        <div className="stockChart">
            <ReactApexChart options={stockChartData.options} series={stockChartData.series} type="line" />
    
        </div>
        <div className="topMovers">
            <div className="topMoversTitle">
                Top Movers
            </div>
            
                {topAccountsDisplay(topAccounts)}
        </div>
        <div className="portfolioBreakdown">
            <div className="portfolioBreakdownTitle">
                Portfolio Breakdown
            </div>

            
            <div class="scrollmenu">
                {IndustryDisplay(topMovers)}
            </div>
        </div>
        
    </div>
  )
}

export default MainInformation