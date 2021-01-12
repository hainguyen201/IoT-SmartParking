var Car = {
    CarCode: 0,
    ParkedTime: "",
    Duration: "",
    PositionID: ""
}


function getCarByCode(code) {
    $.ajax({
        url: "http://localhost:5000/cars/" + code,
        type: 'GET',
        dataType: 'json',
        success: function(car) {
            console.log(car);
            return car;
        },
        error: function(request, message, error) {
            handleException(request, message, error);
        }
    });
}

function carList() {
    $.ajax({
        url: 'http://localhost:5000/cars/',
        type: 'GET',
        dataType: 'json',
        success: function(cars) {
            console.log(cars);
            return cars;
        },
        error: function(request, message, error) {
            handleException(request, message, error);
        }
    });
}