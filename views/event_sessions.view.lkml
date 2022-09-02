## The commented out PDT can be used to prototype the ETL so that sessions are incrementally added each day

view: event_sessions {
  sql_table_name: events.event_sessions ;;

  dimension: client_id {}

  measure: count {
    label: "Number of Sessions"
    type: count
    #drill_fields: [detail*]
  }

  dimension_group: session_start {
    label: "Session Start"
    type: time
    convert_tz: no
    timeframes: [time, date, week, month]
    sql: ${TABLE}.session_start ;;
  }

  dimension: idle_time {
    label: "Idle Time"
    type: number
    #value_format: "0"
    sql: ${TABLE}.idle_time ;;
  }

  dimension: unique_session_id {
    label: "Unique Session ID"
    type: string
    primary_key: yes
    sql: ${TABLE}.unique_session_id ;;
  }

  dimension: session_sequence {
    label: "Session Sequence"
    type: number
    value_format_name: id
    sql: ${TABLE}.session_sequence ;;
  }

  dimension_group: next_session_start {
    label: "Next Session Start"
    type: time
    convert_tz: no
    timeframes: [time, date, week, month]
    sql: case when ${TABLE}.next_session_start > current_date() then null else ${TABLE}.next_session_start end;;
  }


#
#   set: detail {
#     fields: [
#       session_start_at_time,
#       idle_time,
#       unique_session_id,
#       session_sequence,
#       next_session_start_at_time
#     ]
#   }
}
