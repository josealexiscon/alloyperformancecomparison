import React from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chart from "react-apexcharts";
import "./style.css";

const MainInformation = (props) => {
    const totalTransactions = props.totalTransactions;
    const numberOfClients = props.numberOfClients;
    const graph1 = props.graph1;
    const graph2 = props.graph2;
  return (
    <div className="loadingComplete">
        {/* totalTransactions, numberOfClients, graph1, graph2 */}
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
  )
}

export default MainInformation