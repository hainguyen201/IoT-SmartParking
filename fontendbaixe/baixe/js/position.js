var Car = {
    PositionID: "",
    Status: ""
  }


  function getPositionById(ctl) {
    var id = $(ctl).data("id");
    $("#positionId").val(id);
    $.ajax({
      url: "http://localhost:5000/positions/" + id,
      type: 'GET',
      dataType: 'json',
      success: function (position) {
        console.log(position);
        return position;
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }

  function positionList() {
    $.ajax({
      url: 'http://localhost:5000/positions/',
      type: 'GET',
      dataType: 'json',
      success: function (positions) {
          console.log(positions);
        return positions;
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }