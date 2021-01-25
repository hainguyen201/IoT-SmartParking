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
            var aTop ="A1";
            var aBottom = "A2";
            for (let i = 0; i < positions.length; i++) {
                var position = positions[i].positionID;
                var status   = positions[i].status;
                if(position.indexOf(aTop) !== -1){
                    if(status == 1){        
                        $("#A-top").append(
                            `
                                <span id="${position}" class="active">${position}</span>
                            `);
                    }
                    else{
                        $("#A-top").append(
                            `
                                <span id="${position}">${position}</span>
                            `);
                    };
                };
                if(position.indexOf(aBottom) !== -1){
                    if(status == 1){
                        $("#a-bottom").append(
                            `
                            <span id="${position}" class="active">${position}</span>
                            `);
                    }
                    else{
                        $("#a-bottom").append(
                            `
                                <span id="${position}">${position}</span>
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
            for (let i = 0; i < positions.length; i++) {
                var position = positions[i].positionID;
                var status   = positions[i].status;

                // console.log("f" + $("#" + position).hasClass("active"));
                // console.log(status == 0);
                console.log(($("#" + position).hasClass("active")) && status === 0);
                if($("#" + position).hasClass("active") && status == 0){
                    $("#" + position).removeClass("active");
                }
                else if((!$("#" + position).hasClass("active")) && status == 1){
                    $("#" + position).addClass("active");
                }
            }
            console.log(positions);
            
        },
        error: function(request, message, error) {
            handleException(request, message, error);
        }
    });
},4000);