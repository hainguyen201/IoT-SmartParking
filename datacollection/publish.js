const { SSL_OP_EPHEMERAL_RSA } = require('constants');
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.mqttdashboard.com:1883');
var sleep = require('sleep')
client.on('message', function(topic, message) {
    // console.log(message.toString())
})
var i = 0
setInterval(sendData, 2000);

function sendData() {
    var message = {
            id: "A" + getRandomInt(3) + getRandomInt(2),
            value: 30
        }
        // console.log("sending ", message)
    client.publish("channel/topic1", JSON.stringify(message), { qos: 1 }, function() {
        // console.log("sent ", message)
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}