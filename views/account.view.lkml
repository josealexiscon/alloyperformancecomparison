view: account {
  sql_table_name: crm.account;;
  drill_fields: [id]

  #### Primary Key ####

  dimension: id {
    #hidden: yes
    label: "ID"
    primary_key: yes
    type: string
    sql: ${TABLE}.ID;;
  }

  dimension: account_source {
    label: "Account Source"
    type: string
    sql: ${TABLE}.ACCOUNT_SOURCE;;
  }

  ### Status ###

  dimension: is_deleted {
    hidden: yes
    type: yesno
    sql: ${TABLE}.IS_DELETED;;
  }

  dimension: type {
    label: "Type"
    description: "Can be either Customer, Former Customer or Prospect"
    type: string
    sql: ${TABLE}.TYPE;;
  }

  dimension: is_churn {
    type: yesno
    sql: ${type} = 'Former Customer' ;;
  }

  #### Location ###

  dimension: billing_city {
    label: "Billing City"
    group_label: "Location"
    type: string
    sql: ${TABLE}.BILLING_CITY;;
  }

  dimension: billing_country {
    label: "Billing Country"
    map_layer_name: countries
    group_label: "Location"
    type: string
    sql: case when ${TABLE}.BILLING_COUNTRY in ('US','United States of America','United States') then 'USA' else ${TABLE}.BILLING_COUNTRY end ;;
  }

  dimension: billing_email {
    label: "Billing Email"
    group_label: "Location"
    type: string
    sql: ${TABLE}.BILLING_EMAIL_C;;
  }

  dimension: billing_latitude {
    label: "Billing Latitude"
    group_label: "Location"
    # hidden: yes
    type: number
    sql: ${TABLE}.BILLING_LATITUDE;;
  }

  dimension: billing_longitude {
    label: "Billing Longitude"
    group_label: "Location"
    # hidden: yes
    type: number
    sql: ${TABLE}.BILLING_LONGITUDE;;
  }

  dimension: billing_location {
    label: "Billing Location"
    group_label: "Location"
    type: location
    sql_latitude: ${billing_latitude} ;;
    sql_longitude: ${billing_longitude} ;;
  }

  dimension: billing_location_gis {
    type: string
    label: "Billing Location (GIS POINT)"
    group_label: "Location"
    sql: ST_GEOGPOINT(${billing_longitude},${billing_latitude}) ;;
  }

  dimension: billing_postal_code {
    label: "Billing Postal Code"
    group_label: "Location"
    type: zipcode
    sql: ${TABLE}.BILLING_POSTAL_CODE;;
  }

  dimension: billing_state {
    label: "Billing State"
    group_label: "Location"
    type: string
    sql: ${TABLE}.BILLING_STATE;;
    map_layer_name: us_states
  }

  dimension: billing_street {
    label: "Billing Street"
    group_label: "Location"
    type: string
    sql: ${TABLE}.BILLING_STREET;;
  }

  dimension: phone {
    label: "Phone"
    group_label: "Location"
    type: string
    sql: ${TABLE}.PHONE;;
  }

  dimension: website {
    label: "Website"
    hidden: yes
    type: string
    sql: ${TABLE}.WEBSITE;;
  }

  #### Dates ###

  dimension_group: created {
    label: "Created"
    description: "The date that the account was created in salesforce"
    type: time
    timeframes: [
      raw,
      time,
      date,
      week,
      month,
      quarter,
      year,
      day_of_month,
      day_of_week
    ]
    convert_tz: no
    sql: timestamp(${TABLE}.CREATED_DATE);;
  }

  dimension_group: end {
    label: "End"
    description: "The date that the customer either cancelled their contract or didn't renew (i.e. when they churned)"
    type: time
    timeframes: [
      raw,
      date,
      week,
      month,
      quarter,
      year,
      day_of_month,
      day_of_week
    ]
    convert_tz: no
    sql: timestamp(${TABLE}.CUSTOMER__END__DATE___C);;
  }


  dimension_group: start {
    label: "Start"
    description: "The first start date of closed opportunities associate with this account"
    type: time
    timeframes: [
      raw,
      date,
      week,
      month,
      quarter,
      year,
      day_of_month,
      day_of_week
    ]
    convert_tz: no
    sql: timestamp(${TABLE}.CUSTOMER__START__DATE___C);;
  }

  dimension_group: next_contract_renewal {
    label: "Next Contract Renewal"
    type: time
    timeframes: [
      raw,
      date,
      week,
      month,
      quarter,
      year
    ]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.NEXT_CONTRACT_RENEWAL_DATE_C;;
  }


  ### Acount Details ###

  dimension: account_name {
    label: "Bank Name"
    type: string
    sql: ${TABLE}.NAME;;
    link:{
      label: "View Account in Salesforce"
      url: "https://looker--zapier.cs22.my.salesforce.com/0011700000wUuUP"
      icon_url: "https://cdn.iconscout.com/icon/free/png-512/salesforce-3-569548.png"
    }
    link: {
      label: "Visit Company Website"
      url: "https://{{ account.website._value }}"
      icon_url: "https://img.icons8.com/carbon-copy/2x/company.png"
    }
    link: {
      label: "Account Lookup Dashboard"
      url: "/dashboards/XvgfHueXpfntyVOSsGnfvc?Account%20Name={{ value }}"
      icon_url: "http://www.looker.com/favicon.ico"
    }
    action: {
      label: "Send Email to Customer"
      url: "https://hooks.zapier"
      icon_url: "http://www.sendgrid.com/favicon.ico"
      form_param: {
        name: "Subject"
        type: string
        required: yes
      }
      form_param: {
        name: "Body"
        type: textarea
        required: yes
      }
    }
  }

  dimension: industry {
    label: "Industry"
    type: string
    sql: ${TABLE}.INDUSTRY;;
  }

  dimension: number_of_employees {
    label: "Number of Employees"
    description: "Estimate on the number of employees at the comany, from LinkedIn"
    type: number
    sql: ${TABLE}.NUMBER_OF_EMPLOYEES;;
  }

  dimension: number_of_employees_tier {
    label: "Number of Employees Tier"
    type: tier
    tiers: [0, 10, 50, 100, 500, 1000, 10000]
    style: integer
    sql: ${number_of_employees} ;;
  }

  dimension: nps_score {
    label: "NPS Score"
    description: "Average NPS score for engagements with the account"
    type: number
    sql: ${TABLE}.JUMPSTART_NPS_SCORE_C;;
  }



#### Foreign Keys

  dimension: first_lead_id {
    hidden: yes
    type: string
    sql: ${TABLE}.FIRST_LEAD_ID_C;;
  }

  dimension: created_by_id {
    hidden: yes
    type: string
    sql: ${TABLE}.CREATED_BY_ID;;
  }

  dimension: owner_id {
    label: "Owner ID"
    #current account owner, based on the owner of the last opportunity tied to account
    hidden: no
    type: string
    sql: ${TABLE}.owner_id;;
  }

  dimension: cs_manager_id {
    label: "CS Manager ID"
    #current customer success manager for the account
    hidden: no
    type: string
    sql: ${TABLE}.RENEWAL_MANAGER_C;;
  }

  dimension: zendesk_organization_id {
    hidden: yes
    type: string
    sql: ${TABLE}.ZENDESK___ZENDESK__ORGANIZATION__ID___C;;
  }

  dimension: sdr_assigned {
    hidden: yes
    type: string
    sql: ${TABLE}.SDR_ASSIGNED_C;;
  }

  dimension: is_high_value_account {
    description: "The sum of all opportunites ACV is about $50,000"
    type: yesno
    sql: (select sum(amount) from crm.account where account_id = ${id})> 50000;;
  }

  ### Measures

  measure: count {
    label: "Number of Accounts"
    type: count
    drill_fields: [detail*]
  }

  measure: number_of_current_customers {
    type: count
    description: "counts number of accounts that are currently customer"
    filters: [type: "Customer"]
  }

  measure: average_number_of_employees {
    label: "Average Number of Employees"
    type: average
    sql: ${number_of_employees} ;;
    drill_fields: [detail*]
  }

  measure: gis_point {
    sql: ST_GEOGPOINT(${billing_longitude},${billing_latitude}) ;;
  }


  set: detail {
    fields: [account_name, account.start_date, billing_city, billing_state, number_of_employees_tier, industry, opportunity_line_item.closed_won_arr]
  }
}
