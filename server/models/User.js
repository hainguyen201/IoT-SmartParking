var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UsersSchema = new Schema({
    userID: {
        type: String
    },
    name: {
        type: Number
    },
    account: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    }
});
module.exports = mongoose.model('users', UsersSchema);