const forIndustryBar = (transactionByIndustry)=>{
    var listOfCategores = [];
    var listOfValues = [];
    for(var i=0;i<transactionByIndustry.length;i++){
        listOfCategores[i] = transactionByIndustry[i]['account.industry'];
        listOfValues[i] = transactionByIndustry[i]['event_sessions.count'];
    }
    const optionsAndSeries = {
        options: {
            chart: {
                type: 'bar',
                height: 350
                },
            xaxis: {
                categories: listOfCategores
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            }
        },
        series: [{
            data: listOfValues
        }]
      }
      return optionsAndSeries;
}

const forAccountsBar = (topAccounts)=>{
    var listOfCategores = [];
    var listOfValues = [];
    for(var i=0;i<topAccounts.length;i++){
        listOfCategores[i] = topAccounts[i]["account.account_name"].value;
        listOfValues[i] = topAccounts[i]["event_sessions.count"].value;
    }
    const optionsAndSeries = {
        options: {
            chart: {
                type: 'bar',
                height: 350
                },
            xaxis: {
                categories: listOfCategores
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            }
        },
        series: [{
            data: listOfValues
        }]
      }
      return optionsAndSeries;
}

export {forIndustryBar}
export {forAccountsBar}