var RaspiSensors = require('raspi-sensors');
var request = require('request')

var BMP180 = new RaspiSensors.Sensor({
  type: "BMP180",
  address: 0X77
}, "Room1Pi");


BMP180.fetch(function (err, data) {
  if (err) {
    console.error("An error occured!");
    console.error(err.cause);
    return;
  }
  postDataWithDelay(data)
  // Log every hour
});

// Using CRONtab job instead

// BMP180.fetchInterval(function (err, data) {
//   if (err) {
//     console.error("An error occured!");
//     console.error(err.cause);
//     return;
//   }
//   postDataWithDelay(data)
//   // Log every hour
// }, 3600);

function postDataWithDelay(data) {
  console.log('Measurement happened')
  console.log(new Date())
  // Delay pressure saving, to avoud multiple hour creating
  if (data.type === "Pressure") {
    setTimeout(function () {
      postMeasurement(data)
    }, 50000);
  } else {
    postMeasurement(data);
  }
}

function postMeasurement(sensorData) {
  request({
    url: "https://weaper.herokuapp.com/api/hours/measurement/58ed211899c6b9a3b02e8acd",
    method: "POST",
    json: sensorData
  }, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });
}
