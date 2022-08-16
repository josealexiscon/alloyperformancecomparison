import React, { useEffect, useState, useContext, Fragment } from 'react'
import { 
  Space, 
  ComponentsProvider, 
  Span,
  Button,
  DataTable,
  DataTableItem,
  DataTableCell,
  Spinner, 
  mergeClassNames
} from '@looker/components'


import { ExtensionContext } from '@looker/extension-sdk-react'


export const Alloy = () => {
  
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const { coreSDK } = useContext(ExtensionContext)
  

  const loadPostgreData = async () => {
    try {
      setLoading(true)
      setData(undefined)
      setMessage("loading data")

   
      const postgreTotalTranscationsResult = await coreSDK.ok(coreSDK.run_inline_query({
        result_format: 'json_detail',
        limit: 10,
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



      //viewing purposes
      

      console.log(
        `
        Postgre:
        Total Transactions: ${postgreTotalTranscations} \n
        Number of Clients: ${postgreNumberOfClients} \n
        Transactions by Industry: ${postgreTransactionsByIndustry} \n
        Top Accounts: ${postgreTopAccounts}
        `
      )
      

    } catch(error) {
        console.log(error)
        return "error"
    } finally {
      setLoading(false)
      setMessage("data loaded, console")
    }
  }

  const loadData = async () => {
    try {
      setLoading(true)
      setData(undefined)
      setMessage("loading data")

     


      const alloyTotalTranscationsResult = await coreSDK.ok(coreSDK.run_inline_query({
        result_format: 'json_detail',
        limit: 10,
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
      
      



      //viewing purposes
      console.log(
        `
        Alloy:
        Total Transactions: ${alloyTotalTranscations} \n
        Number of Clients: ${alloyNumberOfClients} \n
        Transactions by Industry: ${alloyTransactionsByIndustry} \n
        Top Accounts: ${alloyTopAccounts}\n
        `
        )
      

    } catch(error) {
        console.log(error)
        return "error"
    } finally {
      setLoading(false)
      setMessage("data loaded, console")
    }
  }

  
  return (
    <>
      <ComponentsProvider>
        <Space around>
          <Span fontSize="xxxxxlarge">
            <Button onClick={() => {loadData(), loadPostgreData()}}>
              load data
            </Button>
            {loading && <Spinner />}
            <br></br>
            <Fragment>{message}</Fragment>
          </Span>
        </Space>
      </ComponentsProvider>
    </>
  )
}
