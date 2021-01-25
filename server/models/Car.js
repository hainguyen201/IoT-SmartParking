var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CarSchema = new Schema({
    CarCode: {
        type: String
    },
    ParkedTime: {
        type: Date
    },
    Duration: {
        type: Number
    },
    PositionID: {
        type: String
    }
});
module.exports = mongoose.model('cars', CarSchema);