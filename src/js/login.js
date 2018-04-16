$(function(){

  function checkForm (params) {
    return new Promise (function(resolve,reject) {
      // 正则验证手机号
      let reg = /^\d{11}$/g;
      if(!params.username || !reg.test(params.username)) {
        reject('手机号格式错误');
      }
      if(!params.password || params.length < 6) {
        reject('密码错误');
      }
      resolve(params);
    });
  }
  // 调用登录验证接口
  function login (params) {
    return axios.post('login',params);
  }
 function check (data) {
   // 登录成功
  return new Promise(function(resolve,reject) {
    if(data.meta.status === 200) {
      let info = JSON.stringify(data.data);
      localStorage.setItem('userInfo',info);
      resolve();
    } else {
      // $.toast(data.meta.msg);
      reject(data.meta.msg);
    }//if end
  });//promise end
}

  $('#loginBtn').on('click',function() {
    // console.log(123);
    let mobile = $('#mobile').val();
    let password = $('#password').val();  
    let params = {
      username : mobile,
      password : password
    };
    checkForm(params)
    .then(login)
    .then(check)
    .then(function(){
      location.href = '/index.html';
    })
    .catch(function(err) {
      $.toast(err);
    })

    /*axios.post('login',{
      username : mobile,
      password : password
    })
    .then(checkForm)
    .then(function(data) {
        // 登录成功
        if(data.meta.status === 200) {
          let info = JSON.stringify(data.data);
          localStorage.setItem('userInfo',info);
          // location.href = '/index.html';
        } else {
            $.toast(data.meta.msg);
        }//if end

      })//then end*/
    });//click end
    $(document).on("pageInit", function(e, pageId, $page) {
      // 初始化页面
      // 获取用户信息并将其显示到页面中
      let info = localStorage.getItem('userInfo');
      let uname = JSON.parse(info).username;
      $('#mobile').val(uname);
    });//pageInt end
    $.init();
  });//$ end