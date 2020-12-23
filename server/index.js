const express = require('express');
const bodyParser = require('body-parser');
const positionRouter = require('./routes/position');
const carRouter = require('./routes/car');
const mongoose = require('mongoose');

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.mqttdashboard.com')
require('dotenv').config({ path: '.env' });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/postion', positionRouter);
app.use('/car', carRouter);

const database = require('./configs/database');
mongoose.connect(database.dbStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.on('error', err => console.log(err));

app.listen(3000, () => console.log('Server start on port 3000!'))

var pController = require('./controllers/positionController')
client.on('connect', function() {
    client.subscribe('channel/topic1', function(err) {
        if (!err) {
            client.publish('channel1/topic', 'mqtt error')
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