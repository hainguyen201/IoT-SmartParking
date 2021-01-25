// Call the dataTables jQuery plugin
$(window).on('load', function () {
  setInterval(function(){
    $('#dataTable').DataTable();
  },1000);
});