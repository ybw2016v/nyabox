
function GetUserToken() {
    doginfostr = localStorage.getItem('i');
    if (doginfostr === null) {
      console.log('未登录');
      return false;
    }
    else {
        ck = $.post("/api/i/",
        {
          i: doginfostr
        },
        function (data, status) {
          if (data.r == 'OK') {
              window.dog_info=data.c;
              p1=document.getElementById("resddog");
              p1.innerText=`您已经以${data.c.name}身份登录，再次登录可以切换用户或刷新用户信息。`;
              p2=document.getElementById("usernamedog");
              p2.innerText=data.c.name;
              doginfo=JSON.stringify(data.c);
              localStorage.setItem("doginfo",doginfo);
          }
          else {
              console.log("登录错误。");
          }
        });
    }
}


function dogin() {
    iconurl=encodeURIComponent("https://www.dogcraft.top/avatar.jpg")
    cburl=encodeURIComponent(location.origin+"/static/cb.html")
    desp=encodeURIComponent("一个提问箱")
    AuthUrl=`https://m.dogcraft.top/meow/?response_type=token&icon=${iconurl}&redirect_uri=${cburl}&name=Nyabox&desp=${desp}`
    window.location.href=AuthUrl;
}

function gohome() {
  location.href = "/home/";
}

window.onload=function () {
    GetUserToken()
}