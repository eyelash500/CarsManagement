$(document).ready(function () {
    $('.ui.form').form({
        fields: {
            email: {
                identifier: 'email',
                rules: [{
                    type: 'empty',
                    prompt: '請輸入帳號'
                }
                ]
            },
            password: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: '請輸入密碼'
                },
                {
                    type: 'length[4]',
                    prompt: '密碼少於4個字'
                }
                ]
            }
        },
        onSuccess: function(){
            $.ajax({
                url:"./Controllers/login.php",
                type:"POST",
                dataType:"text",
                data:{
                    Account: $("#account").val(),
                    Password: $("#password").val()
                },
                success: function(r){
                    // sessionStorage.setItem("userid", $("#account").val());
                    if(r == 1){
                        // alert("登入成功");
                        // console.log("data:"+r);
                        window.location = "./maintenance.html";
                    }
                    else{
                        alert("登入失敗 \n請檢查帳號和密碼");
                    }
                    
                },
                error: function(r){
                    alert("系統發生錯誤");
                    window.location = "./index.html";
                }
            })
        }
    });
});
