var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.mqttdashboard.com')
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
// Database connection
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.on('error', (err) => {
    console.error(`Database Connection Error → ${err.message}`);
});
var pController = require('./PositionController')
client.on('connect', function() {
    client.subscribe('channel/topic1', function(err) {
        if (!err) {
            client.publish('channel1/topic', 'Hello mqtt')
        }
    })

});
// require our models here so that it can be accessed throughtout the application
client.on('message', async function(topic, message) {
    // message is Buffer
    // console.log(message.toString())
    var data = JSON.parse(message.toString());
    var value = data.value;
    var status = 0;
    if (value >= 10 && data.value <= 50)
        status = 1;
    else if (value < 10)
        status = -1
    var position = {};
    position.positionID = data.id;
    position.status = status;
    pController.findAndUpdateOrPost(position)
});