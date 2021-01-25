const { json } = require("express");
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);
const Positions = require('../models/Position')

exports.getPositions = async(req, res) => {
    await Positions.find((err, data) => {
        if (err) {
            res.status(500).send(JSON.stringify(err))
        } else {
            res.status(200).send(JSON.stringify(data))
        }

    });

}
exports.getPositionsByID = async(req, res) => {
    console.log(req.params)
    await Positions.findOne({ "positionID": req.params.positionId }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
            res.json(data)
        }
    })

}
exports.createPosition = async(req, res) => {
    var position = req.body;
    console.log(position);
    await new Positions(position).save((err, data) => {
        if (err) {
            res.status(500).json({
                message: "something went wrong, please try again"
            })
        } else {
            res.json(data)
        }
    })
}
exports.updatePositionStatus = async(req, res) => {
    var positionid = req.params.positionId;
    console.log(positionid)
    console.log(req.body)
    await Positions.findOneAndUpdate({ positionID: positionid }, { status: req.body.status }, { upsert: true }, async(err, data) => {
        if (err) {
            res.status(500).json({
                message: "something went wrong, please try again"
            })

        } else {
            res.json(data);
        }
    })
}
exports.findAndUpdateOrPost = async(body, result) => {
    await Positions.findOne({ "positionID": body.positionID }, async(err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            // console.log(body);
            if (data) {
                await Positions.findOneAndUpdate({ "positionID": body.positionID }, { $set: body }, async(err, data) => {
                    if (err) {
                        console.log(err)
                    }
                })
            } else {
                await new Positions(body).save((err, data) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        }
    })
}
exports.deletePosition = async(req, res) => {
    var positionid = req.params.positionId
    await Positions.findOneAndRemove({ positionID: positionid }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "something went wrong"
            })
        } else {
            res.json(data)
        }
    })
}