const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);
const Cars = require('../models/Car')

exports.getCars = async(req, res) => {
    await Cars.find((err, data) => {
        if (err) {
            res.status(500).send({
                message: "error"
            })
        } else {
            data.forEach(car => {
                var parttime = car.ParkedTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');

                car.ParkedTime = parttime;
                console.log(parttime)
            })
            console.log(data)
            res.json(data);
        }

    });
}
exports.getCarOutByCarCode = async(req, res) => {
    var carCode = req.params.carCode;
    console.log(carCode)
    var result = await Cars.findOne({ CarCode: carCode, Duration: 0 }, (err, data) => {
        console.log(data)
        if (err) {
            res.status(500).send({
                message: "something went wrong"
            })
        } else {
            res.json(data)
        }
    })
}
exports.getCarByCarCode = async(req, res) => {
    var carCode = req.params.carCode;
    var result = await Cars.findOne({ CarCode: carCode }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "something went wrong"
            })
        } else {
            res.json(data)
        }
    })

}
exports.createCar = async(req, res) => {
    var data = req.body;
    data.ParkedTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    data.Duration = 0;
    console.log(data)
    await new Cars(data).save((err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                message: "something went wrong, please try again"
            })
        } else {
            res.json(data);
        }
    })
}
exports.updateCar = async(req, res) => {
    let id = req.params.id;
    await Cars.findOneAndUpdate({ "_id": id }, { $set: req.body }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "somethinh went wrong"
            })
        } else {
            res.json(data)
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