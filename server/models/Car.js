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
        type: Schema.Types.ObjectId, ref: 'positions'
    }
});
module.exports = mongoose.model('cars', CarSchema);