view: client {
  sql_table_name: events.client;;
  drill_fields: [id]

  dimension: id {
    hidden: yes
    primary_key: yes
    type: string
    sql: ${TABLE}.ID ;;
  }

  dimension: salesforce_account_id {
    hidden: yes
    type: string
    sql: ${TABLE}.SALESFORCE_ACCOUNT_ID ;;
  }
}
