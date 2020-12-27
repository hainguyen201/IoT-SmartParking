var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PositionsSchema = new Schema({
    positionID: {
        type: String
    },
    status: {
        type: Number
    }
});
module.exports = mongoose.model('positions', PositionsSchema);