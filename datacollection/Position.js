const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const PositionsSchema = new mongoose.Schema({
    positionID: {
        type: String
    },
    status: {
        type: Number
    }
});
module.exports = mongoose.model('positions', PositionsSchema);