var Car = {
    CarCode: 0,
    ParkedTime: "",
    Duration: "",
    PositionID: ""
}
function parseTime(a){
    var x = a.split(/\D+/);
    var result = x[0] + "-" + x[1] + "-" + x[2] + "/" + x[3] + ":" + x[4] + ":" + x[5];
    return result;
}
function getYear(a,b){
    var x = a.split(/\D+/);
    var y = b.split(/\D+/);
    var year = x[0] - y[0];
    var month = x[1] - y[1];
    var day = x[2] - y[2];
    var hour = x[3] - y[3];
    var minute = x[4] - y[4];
    var result = year*525600 + month*43200 + day*1440 + hour*60 + minute;
    return result;
}
$(window).on('load', function () {
    $("#dataTables_empty").css("display", "none");
  });
function getCarByCode(code) {
    $.ajax({
        url: base_url + '/cars/' + code,
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
        url: base_url + '/cars/',
        type: 'GET',
        dataType: 'json',
        success: function(cars) {
            var i = 0;
            for (i = 0; i < cars.length; i++) {
                var carCode = cars[i].CarCode;
                var parkedTime = cars[i].ParkedTime;
                var duration = cars[i].Duration;
                var time = parseTime(parkedTime)
                $("#table-car").append(`<tr>
                        <td>${carCode}</td>
                        <td>${time}</td>
                        <td>${duration}</td>
                    </tr>`);
            }
        },
        error: function(request, message, error) {
            handleException(request, message, error);
        }
    });
};
function addCar(){
    var carID = $("#get-id-card").val();
    var data = {
        "CarCode": carID
    };
    $.ajax({
        url: base_url + '/cars/',
        type: 'POST',
        data: data,
        success: function(cars) {
            alert("Đã thêm xe");
            location.reload();
        },
        error: function(request, message, error) {
            handleException(request, message, error);
        }
    });
}
function carOut(){
    var d = new Date();
    var n = d.toISOString();
    var b = n.split(/\D+/);
    var carID = $("#get-id-card-out").val();
    console.log(carID);
    $.ajax({
        url: base_url + '/cars/carouts/' + carID,
        type: 'GET',
        dataType: 'json',
        success: function(car) {
            console.log(car + "hí");
                if(car == null){alert("không có xe trong bãi xe")}
                else{
                        var id = car._id;
                        var carCode = car.CarCode;
                        var parkedTime = car.ParkedTime;
                        var duration = car.Duration;
                        if(duration  == 0){
                            var result = getYear(n,parkedTime);
                            var data = {
                                "Duration":result
                            }
                            $.ajax({
                                url: base_url + '/cars/' + id,
                                type: 'PUT',
                                data: data,
                                dataType:"application/json",
                                success: function() {
                                    alert("Tổng thời gian là:" + result  + "phút");
                                    window.location.reload();
                                },
                                error: function() {

                                    alert("Tổng thời gian là:" + result +  "phút");
                                    window.location.reload();
                                }
                            });
                        }
                        else{
                            alert("Không có xe trong bãi xe");
                        }
                    }
                        
        },
        error: function(request, message, error) {
            handleException(request, message, error);
        }
    });
}
carList();