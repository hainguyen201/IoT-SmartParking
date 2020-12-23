const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);
const Positions = require('../models/Position')

exports.getPositions = async(req, res) => {
    const positions = await Positions.find();
    res.json(posts);
}
exports.getPositionsByID = async(id) => {
    await Positions.findOne({ positionID: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
        }
    })
    return result;
}
exports.createPosition = async(data) => {
    await new Positions(data).save((err, data) => {
        if (err) {
            res.status(500).json({
                message: "something went wrong, please try again"
            })
        }
    })
}
exports.updatePosition = async(body) => {
    let positionID = body.positionID;
    await Positions.findOneAndUpdate({ "positionID": positionID }, { $set: body }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log("ok")
        }
    })
}
exports.findAndUpdateOrPost = async(body) => {
    await Positions.findOne({ "positionID": body.positionID }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            console.log(body);
            if (data) {
                this.updatePosition(body);
            } else {
                console.log(body)
                this.createPosition(body)
            }
        }
    })
}