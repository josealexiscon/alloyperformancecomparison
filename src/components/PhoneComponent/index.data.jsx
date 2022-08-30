const topIndustriesValues = (transactionByIndustry) =>{

    var listToReturn = [];
    const colorValues = ['3F77D9','F6BA16','2CC3DF','FA7E1F'];
    var total = 0;
    for(var i=0;i<transactionByIndustry.length;i++){
        total = total + transactionByIndustry[i]['event_sessions.count'];
    }
    for(var i=0;i<transactionByIndustry.length;i++){
        listToReturn.push(
            {
                'account':transactionByIndustry[i]['account.industry'],
                'value': (transactionByIndustry[i]['event_sessions.count']/total) * 100,
                'colorValue' : colorValues[i%colorValues.length]
            }
        )
    }

    console.log("The list is")
    console.log(listToReturn)
    return listToReturn;
}

const topAccountsValues = (topAccounts) =>{
    var total = 0;
    for(var i=0;i<topAccounts.length;i++){
        total = total + topAccounts[i]["event_sessions.count"].value;
    }
    var listToReturn = [];
    const colorValues = ['#3F77D9','#F6BA16','#2CC3DF','#FA7E1F'];
    for(var i=0;i<topAccounts.length;i++){
        listToReturn.push(
            {
                'account':topAccounts[i]["account.account_name"].value,
                'value':topAccounts[i]["event_sessions.count"].value,
                'percentage': (topAccounts[i]["event_sessions.count"].value/total) * 100,
                'colorValue' : colorValues[i%colorValues.length]
            }
        )
    }
    return listToReturn;
}







export {topIndustriesValues, topAccountsValues}