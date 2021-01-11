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
exports.updateCar = async(body) => {
    let carCode = body.CarCode;
    await Cars.findOneAndUpdate({ "CarCode": carCode }, { $set: body }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            // console.log("ok")
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