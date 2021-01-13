function login(){
    var username = $("#txt_uname").val().trim();
    var password = $("#txt_pwd").val().trim();

    if( username != "" && password != "" ){
        $.ajax({
            url:'checkUser.php',
            type:'post',
            data:{username:username,password:password},
            success:function(response){
                var msg = "";
                if(response == 1){
                    window.location = "index.html";
                }else{
                    msg = "Invalid username and password!";
                }
                $("#message").html(msg);
            }
        });
    }
}