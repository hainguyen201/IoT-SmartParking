function login(){
    var userName = $("#exampleInputEmail").val();
    var password  = $("#exampleInputPassword").val();
        $.ajax({
            url: base_url + '/users/',
            type: 'GET',
            dataType: 'json',
            success: function(users) {
                var check = "";
                for (i = 0; i < users.length; i++) {
                    var userID = users[i].userID;
                    var passWord = users[i].password;
                    if(userName == userID && passWord == password){
                        check = "true";
                        location.replace("index.html");
                    }
                };
                if(check != "true"){
                    alert("Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại.")
                }
            },
            error: function(request, message, error) {
                handleException(request, message, error);
            }
        });
    // location.replace("index.html");

}