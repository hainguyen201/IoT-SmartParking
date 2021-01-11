const { json } = require("express");
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);
const Users = require('../models/User')

exports.getUsers = async(req, res) => {
    const users = await Users.find();
    res.json(users)
}
exports.getUsersByID = async(req, res) => {
    console.log(req.params)
    await Users.findOne({ "userID": req.params.userId }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
            res.json(data)
        }
    })

}
exports.createUser = async(req, res) => {
    var user = req.body;
    console.log(user);
    await new Users(user).save((err, data) => {
        if (err) {
            res.status(500).json({
                message: "something went wrong, please try again"
            })
        } else {
            res.json(data)
        }
    })
}
exports.updateUser = async(req, res) => {
    var body = req.body;
    let userID = req.params.userID;
    console.log(userID)
    console.log(req.body)
    await Users.findOneAndUpdate({ "userID": userID }, { $set: body }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
}
exports.findAndUpdateOrPost = async(body, result) => {
    await Users.findOne({ "userID": body.userID }, async(err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            // console.log(body);
            if (data) {
                await Users.findOneAndUpdate({ "userID": body.userID }, { $set: body }, async(err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        result(data);
                    }
                })
            } else {
                await new Users(body).save((err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        result(data);
                    }
                })
            }
        }
    })
}
exports.deleteUser = async(req, res) => {
    var userid = req.params.userId
    await Users.findOneAndRemove({ userID: userid }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "something went wrong"
            })
        } else {
            res.json(data)
        }
    })
}