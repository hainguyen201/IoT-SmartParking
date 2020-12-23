const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);
const Cars = require('../models/Car')

exports.getCars = async(req, res) => {
    const cars = await Cars.find();
    return res.json(cars);
}
exports.getCarByCarCode = async(carCode) => {
    var result = await Cars.findOne({ CarCode: carCode }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
        }
    })
    return result;
}
exports.createCar = async(data) => {
    await new Cars(data).save((err, data) => {
        if (err) {
            res.status(500).json({
                message: "something went wrong, please try again"
            })
        }
    })
}
exports.updateCar = async(body) => {
    let carCode = body.CarCode;
    await Cars.findOneAndUpdate({ "CarCode": carCode }, { $set: body }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log("ok")
        }
    })
}
exports.findAndUpdateOrPost = async(body) => {
    await Cars.findOne({ "CarCode": body.CarCode }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            console.log(body);
            if (data) {
                this.updateCar(body);
            } else {
                console.log(body)
                this.createCar(body)
            }
        }
    })
}