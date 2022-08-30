import React, { useState, useContext } from 'react'
import PhoneComponent from '../PhoneComponent'
import Button from '@mui/material/Button';
import { firstReturn, secondReturn } from './index.data';
import Grid from '@mui/material/Grid';

import { ExtensionContext } from '@looker/extension-sdk-react'
import Typography from '@mui/material/Typography';


const TwoPhones = () => {

  const [receiveddata,setReceivedData] = useState({});
  const [dataAvailable, setDataAvailable] = useState(false);

  const [receiveddata2,setReceivedData2] = useState({});
  const [dataAvailable2, setDataAvailable2] = useState(false);

  const [messageAlloy, setMessageAlloy] = useState()
  const [messagePostgre, setMessagePostgre] = useState()
  const [loadingAlloy, setLoadingAlloy] = useState(true)
  const [loadingPostgre, setLoadingPostgre] = useState(true)
  const [dataAlloy, setDataAlloy] = useState()
  const [dataPostgre, setDataPostgre] = useState()

  const [startPressed, setStartPressed] = useState(false)
  const { coreSDK } = useContext(ExtensionContext)


  const loadPostgreData = async () => {
    
    try {
      setStartPressed(true)
      setLoadingPostgre(true)
      setDataPostgre(undefined)
      setMessagePostgre("loading postgre data")

   
      const postgreTotalTranscationsResult = await coreSDK.ok(coreSDK.run_inline_query({
        result_format: 'json_detail',
        limit: 500,
        body: {
            total: true,
            model: 'lux_cc_next',
            view: 'event_logs',
            fields: ['event_sessions.count'],
            filters: {'event_logs.timestamp_date': '2021/07/01 to 2021/07/08', 'event_logs.sequence': '<100', 'event_sessions.session_start_date': '2021/07/01 to 2021/07/08', 'account.account_name': 'a%,b%,c%,d%,e%'},
        filter_expression: "${event_logs.client_id}=${client.id} AND ${event_sessions.client_id}=${client.id}",
          },
      }))

      const postgreNumberOfClientsResult = await coreSDK.ok(coreSDK.run_inline_query({
        result_format: 'json_detail',
        limit: 500,
        body: {
          total: true,
          model: 'lux_cc_next',
          view: 'event_logs',
          fields: ['event_logs.user_count'],
          filters: {'event_logs.timestamp_date': '2021/07/01 to 2021/07/08', 'event_logs.sequence': '<100', 'event_sessions.session_start_date': '2021/07/01 to 2021/07/08', 'account.account_name': 'a%,b%,c%,d%,e%'},
          filter_expression: "${event_logs.client_id}=${client.id} AND ${event_sessions.client_id}=${client.id}",
          },
      }))

      const postgreTransactionsByIndustryResult = await coreSDK.ok(coreSDK.run_inline_query({
        result_format: 'json_detail',
        limit: 500,
        body: {
          total: true,
          model: 'lux_cc_next',
          view: 'event_logs',
          fields: ['event_sessions.count', 'account.industry'],
          filters: {'event_logs.timestamp_date': '2021/07/01 to 2021/07/08', 'event_logs.sequence': '<100', 'event_sessions.session_start_date': '2021/07/01 to 2021/07/08', 'account.account_name': 'a%,b%,c%,d%,e%'},
          filter_expression: "${event_logs.client_id}=${client.id} AND ${event_sessions.client_id}=${client.id}",
          sorts: ['event_sessions.count desc'],
          }
      }))

      const postgreTopAccountsResult = await coreSDK.ok(coreSDK.run_inline_query({
        result_format: 'json_detail',
        limit: 500,
        body: {
          total: true,
          model: 'lux_cc_next',
          view: 'event_logs',
          fields: ['event_sessions.count', 'account.account_name'],
          filters: {'event_logs.timestamp_date': '2021/07/01 to 2021/07/08', 'event_logs.sequence': '<100', 'event_sessions.session_start_date': '2021/07/01 to 2021/07/08', 'account.account_name': 'a%,b%,c%,d%,e%'},
          filter_expression: "${event_logs.client_id}=${client.id} AND ${event_sessions.client_id}=${client.id}",
          sorts: ['event_sessions.count desc'],
          }
      }))
      
      // setDataPostgre(postgreTotalTranscationsResult)

      let postgreTotalTranscations = postgreTotalTranscationsResult.data[0]["event_sessions.count"].value
      let postgreNumberOfClients = postgreNumberOfClientsResult.data[0]["event_logs.user_count"].value
      let postgreTransactionsByIndustry = []
      let postgreIndustriesLength = postgreTransactionsByIndustryResult.data.length
      for (let i = 0; i < postgreIndustriesLength; i++) {
        postgreTransactionsByIndustry[i] = {
          "account.industry" : postgreTransactionsByIndustryResult.data[i]["account.industry"].value,
          "event_sessions.count" : postgreTransactionsByIndustryResult.data[i]["event_sessions.count"].value
          }
      }

      let postgreTopAccounts = postgreTopAccountsResult.data

      let postgreData = {
        "totalTranscations" : postgreTotalTranscations,
        "numberOfClients" : postgreNumberOfClients,
        "transactionsByIndustry" : postgreTransactionsByIndustry,
        "topAcounts" : postgreTopAccounts 
      }
      setDataPostgre(postgreData)
      console.log("Postgress DB")
      console.log(postgreData)



      // console.log(
      //   `
      //   Postgre:
      //   Total Transactions: ${postgreTotalTranscations} \n
      //   Number of Clients: ${postgreNumberOfClients} \n
      //   Transactions by Industry: ${postgreTransactionsByIndustry} \n
      //   Top Accounts: ${postgreTopAccounts}
      //   `
      // )
      

    } catch(error) {
        console.log(error)
        setMessagePostgre("failed to load postgre data")
        return "error"
    } finally {
      setLoadingPostgre(false)
      setMessagePostgre("Postgre data loaded")
    }
  }

  const loadAlloyData = async () => {
    try {
      setStartPressed(true);
      setLoadingAlloy(true)
      setDataAlloy(undefined)
      setMessageAlloy("loading alloy data")

      const alloyTotalTranscationsResult = await coreSDK.ok(coreSDK.run_inline_query({
        result_format: 'json_detail',
        limit: 500,
        body: {
            total: true,
            model: 'lux_next',
            view: 'event_logs',
            fields: ['event_sessions.count'],
            filters: {'event_logs.timestamp_date': '2021/07/01 to 2021/07/08', 'event_logs.sequence': '<100', 'event_sessions.session_start_date': '2021/07/01 to 2021/07/08', 'account.account_name': 'a%,b%,c%,d%,e%'},
        filter_expression: "${event_logs.client_id}=${client.id} AND ${event_sessions.client_id}=${client.id}",
          },
      }))

      const alloyNumberOfClientsResult = await coreSDK.ok(coreSDK.run_inline_query({
        result_format: 'json_detail',
        limit: 500,
        body: {
          total: true,
          model: 'lux_next',
          view: 'event_logs',
          fields: ['event_logs.user_count'],
          filters: {'event_logs.timestamp_date': '2021/07/01 to 2021/07/08', 'event_logs.sequence': '<100', 'event_sessions.session_start_date': '2021/07/01 to 2021/07/08', 'account.account_name': 'a%,b%,c%,d%,e%'},
          filter_expression: "${event_logs.client_id}=${client.id} AND ${event_sessions.client_id}=${client.id}",
          },
      }))

      const alloyTransactionsByIndustryResult = await coreSDK.ok(coreSDK.run_inline_query({
        result_format: 'json_detail',
        limit: 500,
        body: {
          total: true,
          model: 'lux_next',
          view: 'event_logs',
          fields: ['event_sessions.count', 'account.industry'],
          filters: {'event_logs.timestamp_date': '2021/07/01 to 2021/07/08', 'event_logs.sequence': '<100', 'event_sessions.session_start_date': '2021/07/01 to 2021/07/08', 'account.account_name': 'a%,b%,c%,d%,e%'},
          filter_expression: "${event_logs.client_id}=${client.id} AND ${event_sessions.client_id}=${client.id}",
          sorts: ['event_sessions.count desc'],
          }
      }))

      const alloyTopAccountsResult = await coreSDK.ok(coreSDK.run_inline_query({
        result_format: 'json_detail',
        limit: 500,
        body: {
          total: true,
          model: 'lux_next',
          view: 'event_logs',
          fields: ['event_sessions.count', 'account.account_name'],
          filters: {'event_logs.timestamp_date': '2021/07/01 to 2021/07/08', 'event_logs.sequence': '<100', 'event_sessions.session_start_date': '2021/07/01 to 2021/07/08', 'account.account_name': 'a%,b%,c%,d%,e%'},
          filter_expression: "${event_logs.client_id}=${client.id} AND ${event_sessions.client_id}=${client.id}",
          sorts: ['event_sessions.count desc'],
          }
      }))

      // setDataAlloy(alloyTotalTranscationsResult)

      let alloyTotalTranscations = alloyTotalTranscationsResult.data[0]["event_sessions.count"].value
      let alloyNumberOfClients = alloyNumberOfClientsResult.data[0]["event_logs.user_count"].value
      let alloyTransactionsByIndustry = []
      let alloyIndustriesLength1 = alloyTransactionsByIndustryResult.data.length
      for (let i = 0; i < alloyIndustriesLength1; i++) {
        alloyTransactionsByIndustry[i] = {
          "account.industry" : alloyTransactionsByIndustryResult.data[i]["account.industry"].value,
          "event_sessions.count" : alloyTransactionsByIndustryResult.data[i]["event_sessions.count"].value
          }
      }

      let alloyTopAccounts = alloyTopAccountsResult.data
      
      
      let alloyData = {
        "totalTranscations" : alloyTotalTranscations,
        "numberOfClients" : alloyNumberOfClients,
        "transactionsByIndustry" : alloyTransactionsByIndustry,
        "topAcounts" : alloyTopAccounts 
      }

      setDataAlloy(alloyData)
      console.log("Allow DB")
      console.log(alloyData)


      //viewing purposes
      // console.log(
      //   `
      //   Alloy:
      //   Total Transactions: ${alloyTotalTranscations} \n
      //   Number of Clients: ${alloyNumberOfClients} \n
      //   Transactions by Industry: ${alloyTransactionsByIndustry} \n
      //   Top Accounts: ${alloyTopAccounts}\n
      //   `
      //   )
      

    } catch(error) {
        console.log(error)
        setMessageAlloy("failed to load alloy data")
        return "error"
    } finally {
      setLoadingAlloy(false)
      setMessageAlloy("alloy data loaded")
    }
  }

  const getStarted = () =>{
    setReceivedData(firstReturn());
    console.log(firstReturn());
    setDataAvailable(true);

    setReceivedData2(secondReturn());
    console.log(firstReturn());
    setDataAvailable2(true);
  }
  return (
    <div>
      <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={30}>

        <Grid item>
          <Button variant="contained"  onClick={() => {loadAlloyData(), loadPostgreData()}}>Start</Button>

        </Grid>
      </Grid>
        <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={30}>
          
            <Grid item>
            <Typography variant="h5" align="center">
                  AlloyDB              
            </Typography>
            {<PhoneComponent data = {dataAlloy} loadingComplete = {loadingAlloy} startPressed = {startPressed}/>}
            </Grid>
            <Grid item>
            <Typography variant="h5" align="center">
                  PostgresSQL              
            </Typography>
            {<PhoneComponent data = {dataPostgre} loadingComplete = {loadingPostgre} startPressed = {startPressed}/>}
            </Grid>
        </Grid>
    </div>
  )
}

export default TwoPhones