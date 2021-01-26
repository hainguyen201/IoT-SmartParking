var Car = {
    PositionID: "",
    Status: ""
}


function getPositionById(id) {
    $.ajax({
        url: "http://localhost:5000/positions/" + id,
        type: 'GET',
        dataType: 'json',
        success: function(position) {
            console.log(position);
            return position;
        },
        error: function(request, message, error) {
            handleException(request, message, error);
        }
    });
}

function positionList() {
    $.ajax({
        url: 'http://localhost:5000/positions/',
        type: 'GET',
        dataType: 'json',
        success: function(positions) {
            console.log(positions);
            var aTop = "A1";
            var aBottom = "A2";
            for (let i = 0; i < positions.length; i++) {
                var position = positions[i].positionID;
                var status = positions[i].status;
                if (position.indexOf(aTop) !== -1) {
                    if (status == 1) {
                        $("#A-top").append(
                            `
                                <span id="${position}" class="active">${position}</span>
                            `);
                    } else if (status == 0) {
                        $("#A-top").append(
                            `
                                <span id="${position}">${position}</span>
                            `);
                    } else {
                        $("#A-top").append(
                            `
                                <span id="${position}" class="wrong-position">${position}</span>
                            `);
                    };
                };
                if (position.indexOf(aBottom) !== -1) {
                    if (status == 1) {
                        $("#a-bottom").append(
                            `
                            <span id="${position}" class="active">${position}</span>
                            `);
                    } else if (status == 0) {
                        $("#a-bottom").append(
                            `
                                <span id="${position}">${position}</span>
                            `);
                    } else {
                        $("#a-bottom").append(
                            `
                                <span id="${position}" class="wrong-position">${position}</span>
                            `);
                    }
                }
            }
            return positions;
        },
        error: function(request, message, error) {
            handleException(request, message, error);
        }
    });
}
positionList();


setInterval(function positionChange() {
    $.ajax({
        url: 'http://localhost:5000/positions/',
        type: 'GET',
        dataType: 'json',
        success: function(positions) {
            var free_position = 0;
            var wrong_position = 0;
            var in_position = 0;
            for (let i = 0; i < positions.length; i++) {
                var position = positions[i].positionID;
                var status = positions[i].status;

                // console.log("f" + $("#" + position).hasClass("active"));
                // console.log(status == 0);
                // console.log(($("#" + position).hasClass("active")) && status === 0);
                if (status == 0) {
                    free_position++;
                } else if (status == 1)
                    in_position++;
                else
                    wrong_position++;
                if ($("#" + position).hasClass("active") && status == 0) {
                    $("#" + position).removeClass("active");
                    $("#" + position).addClass("wrong-position");
                    // free_position++;

                } else if ((!$("#" + position).hasClass("active")) && status == 1) {
                    $("#" + position).addClass("active");
                    $("#" + position).addClass("wrong-position");
                    // in_position++;
                }
                // trường hợp đỗ sai thì loại bỏ các class active và thêm class wrong-position 
                else if (status === -1) {
                    $("#" + position).removeClass("active");
                    $("#" + position).addClass("wrong-position");
                    // wrong_position++;
                }
            }
            var total = in_position + wrong_position + free_position
            $("#in_position").html(in_position + "/" + total)
            $("#free_position").html(free_position + "/" + total)
            $("#wrong_position").html(wrong_position + "/" + total)

        },
        error: function(request, message, error) {
            handleException(request, message, error);
        }
    });
}, 400);