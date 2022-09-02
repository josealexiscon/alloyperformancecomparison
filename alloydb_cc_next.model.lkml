connection: "database_golden_demo_onprem"

include: "/views/*.view.lkml"
persist_for: "0 seconds"

explore: opportunity_line_item {
  label: "Lux - Opportunities"
  description: "Use this explore for looking at data related to Salesforce Opportunities, Accounts and Sales Representatives"
  join: opportunity {
    view_label: "Opportunities"
    type: inner #only bring in line items with a valid opportunity
    relationship: many_to_one
    sql_on: ${opportunity.id} = ${opportunity_line_item.opportunity_id} ;;
  }
  join: product {
    view_label: "Opportunity Line Item"
    relationship: many_to_one
    sql_on: ${product.id} = ${opportunity_line_item.product_id} ;;
  }
  join: account {
    view_label: "Account"
    relationship: many_to_one
    sql_on: ${opportunity.account_id} = ${account.id} ;;
  }
  join: sales_rep {
    view_label: "Sales Rep"
    from: salesforce_user
    type: full_outer # Full outer here since we want to include reps regardless of whether or not they own an opp
    relationship: many_to_one
    sql_where: ${sales_rep.role_name} like '%Account Executive%' ;; #only bring in the sales reps
    sql_on: ${opportunity.owner_id} = ${sales_rep.id} ;;
  }
  join: sales_manager {
    view_label: "Sales Manager"
    fields: [sales_manager.team_alias, sales_manager.first_name, sales_manager.last_name, sales_manager.name, sales_manager.role_name, sales_manager.email, sales_manager.segment_region, sales_manager.sales_team, sales_manager.region]
    from: salesforce_user
    relationship: many_to_one
    sql_on: ${sales_rep.manager_id} = ${sales_manager.id} ;;
  }
  join: csm {
    fields: [csm.first_name, csm.last_name, csm.name, csm.role_name, csm.email,csm.hire_date, csm.hire_month, csm.hire_year]
    view_label: "Customer Success Manager"
    from: salesforce_user
    relationship: many_to_one
    sql_on: ${account.cs_manager_id} = ${csm.id} ;;
  }
}

explore: event_logs {
  label: "Lux - Raw Event Logs (short term)"
  view_label: "Events"
#   sql_always_where:
#   --just past 3 months
#   ${event_sessions.session_start_date} < current_date() and ${event_sessions.session_start_date} > date_add(current_date(), interval -3 MONTH) and
#   ${event_logs.timestamp_date} < current_date() and ${event_logs.timestamp_date} > date_add(current_date(), interval -3 MONTH) ;;

  conditionally_filter: {
    filters: [event_logs.timestamp_date: "90 days", event_sessions.session_start_date: "90 days"]
  }

  ##unnest JSON fields
  # join: event_logs__log {
  #   view_label: "Events"
  #   sql: LEFT JOIN UNNEST([${event_logs.log}]) as event_logs__log ;;
  #   relationship: one_to_one
  # }
  # join: event_logs__log__cs_uri_stem {
  #   view_label: "Events"
  #   sql: LEFT JOIN UNNEST([${event_logs__log.cs_uri_stem}]) as event_logs__log__cs_uri_stem ;;
  #   relationship: one_to_one
  # }
  # join: event_logs__log__cs_uri_query {
  #   view_label: "Events"
  #   sql: LEFT JOIN UNNEST([${event_logs__log.cs_uri_query}]) as event_logs__log__cs_uri_query ;;
  #   relationship: one_to_one
  # }
  join: event_sessions {
    view_label: "Sessions"
    relationship: many_to_one
    sql_on: ${event_sessions.unique_session_id} = ${event_logs.session_id} ;;
  }
  join: event_session_facts {
    view_label: "Sessions"
    relationship: one_to_one
    sql_on: ${event_sessions.unique_session_id} = ${event_session_facts.unique_session_id} ;;
  }
  join: client {
    relationship: many_to_one
    fields: [client.id]
    sql_on: ${client.id} = ${event_logs.client_id} ;;
  }
  join: account {
    relationship: many_to_one
    view_label: "Account"
    sql_on: ${client.salesforce_account_id} = ${account.id} ;;
  }
}
