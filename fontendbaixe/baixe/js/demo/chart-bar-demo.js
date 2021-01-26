// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
function carList() {
  var year;
  $('select').on('change', function () {
    year = this.value; 
    $.ajax({
      url: base_url + '/cars/',
      type: 'GET',
      dataType: 'json',
      success: function(cars) {
          var i = 0;
          var thang1 = 0;
          var thang2 = 0;
          var thang3 = 0;
          var thang4 = 0;
          var thang5 = 0;
          var thang6 = 0;
          var thang7 = 0;
          var thang8 = 0;
          var thang9 = 0;
          var thang10 = 0;
          var thang11 = 0;
          var thang12 = 0;
          var max = 0;
          for (i = 0; i < cars.length; i++) {
              var carCode = cars[i].CarCode;
              var parkedTime = cars[i].ParkedTime;
              var duration = cars[i].Duration;
              var time = parkedTime.split(/\D+/);
              if(time[0]==year){
                if(time[1] == 1){
                  thang1++;
                }
                if(time[1] == 2){
                  thang2++;
                }
                if(time[1] == 3){
                  thang3++;
                }
                if(time[1] == 4){
                  thang4++;
                }
                if(time[1] == 5){
                  thang5++;
                }
                if(time[1] == 6){
                  thang6++;
                }
                if(time[1] == 7){
                  thang7++;
                }
                if(time[1] == 8){
                  thang8++;
                }
                if(time[1] == 9){
                  thang8++;
                }
                if(time[1] == 10){
                  thang10++;
                }
                if(time[1] == 11){
                  thang12 ++;
                }if(time[1] == 12){
                  thang12++;
                }

              }
              
          }
          var arr  = [thang1,thang2,thang3,thang4,thang5,thang6,thang7,thang8,thang9,thang10,thang11,thang12];
          for(i=0;i<arr.length;i++){
            if(arr[i]>max){
              max = arr[i];
            }
          }
          console.log(max);
          var ctx = document.getElementById("myBarChart");
          var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ["January", "February", "March", "April", "May", "June","July","August", "September", "October", "November", "December"],
              datasets: [{
                label: "Revenue",
                backgroundColor: "#4e73df",
                hoverBackgroundColor: "#2e59d9",
                borderColor: "#4e73df",
                data: [thang1, thang2, thang3, thang4, thang5, thang6,thang7,thang8,thang9,thang10,thang11,thang12],
              }],
            },
            options: {
              maintainAspectRatio: false,
              layout: {
                padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
                }
              },
              scales: {
                xAxes: [{
                  time: {
                    unit: 'Day'
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    maxTicksLimit: 12
                  },
                  maxBarThickness: 25,
                }],
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: max+10,
                    maxTicksLimit: 5,
                    padding: 10,
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                      return  number_format(value);
                    }
                  },
                  gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                  }
                }],
              },
              legend: {
                display: false
              },
              tooltips: {
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
                callbacks: {
                  label: function(tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + number_format(tooltipItem.yLabel);
                  }
                }
              },
            }
          });

      },
      error: function(request, message, error) {
          handleException(request, message, error);
      }
  });
  });
  console.log(year);

};
// Bar Chart Example
carList();