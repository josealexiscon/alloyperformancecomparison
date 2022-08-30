const baFormatter=(first, second)=>{
    var numbertoSend = first/second;
    numbertoSend = numbertoSend.toFixed(2);
    const toReturn = numbertoSend + "%";
    return toReturn;
}



const totalFormatter = (number)=>{
    number = number + 0.02;
    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
  
  return formatter.format(number);
}


const stockChartData = {
        series: [{
            name: "USD",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 130, 120, 125, 100, 110, 90, 69, 91, 95]
        }],
        options: {
          chart: {
            height: 300,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight',
            colors: '#34A853'
          },
          title: {
            text: 'Portfolio trend by Month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          }
        },
      
      
      };
  


export {totalFormatter, baFormatter, stockChartData}