function login() {
    var username = $("#exampleInputEmail").val();
    var password = $("#exampleInputPassword").val();
    $.ajax({
        url: base_url + '/users/logins',
        type: 'POST',
        dataType: 'json',
        data: {
            UserName: username,
            Password: password
        },
        success: function(users) {
            var check = "";
            if (username === users.account && password === users.password) {
                check = "true";
                location.replace("index.html");
            }
            if (check != "true") {
                alert("Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại.")
            }
        },
        error: function(request, message, error) {
            // handleException(request, message, error);
            console.log(error)
        }
    });
    // location.replace("index.html");

}