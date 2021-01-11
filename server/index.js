const express = require('express');
const bodyParser = require('body-parser');
const positionRouter = require('./routes/position');
const carRouter = require('./routes/car');
const userRouter = require('./routes/user')
const cors = require('cors')
const mongoose = require('mongoose');

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.mqttdashboard.com')
require('dotenv').config({ path: '.env' });

const app = express();
var allowedOrigins = [
    'http://127.0.0.1:5500/'
];
app.use(cors({
    origin: allowedOrigins
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/positions', positionRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
const database = require('./configs/database');
mongoose.connect(database.dbStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.on('error', err => console.log(err));

app.listen(process.env.PORT, () => console.log(`Server start on port ${process.env.PORT}!`))

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
    var value = data.value_after;
    var status = 0;
    if (value >= 10 && value <= 40 && data.value_below == 1)
    // đã có xe đỗ
        status = 1;
    else if (value < 10 && data.value_below == 1)
    // đỗ sai
        status = -1
    else if (data.value_below == 0)
    // chưa đỗ
        status = 0
    var position = {};
    position.positionID = data.id;
    position.status = status;
    pController.findAndUpdateOrPost(position)
});