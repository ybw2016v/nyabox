function GetDogToken() {
        const url = decodeURI(location.hash); //获取url中"?"符后的字串
        let theRequest = new Object();
        if (url.indexOf("#") != -1) {
           let str = url.substr(1);
           strs = str.split("&");
           for (let i = 0; i < strs.length; i++) {
              theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
           }
        }
        return theRequest;
}


urlp=GetDogToken()

console.log(urlp);

if ((urlp.token_type != "key")) {
    alert("错误调用！");
} else {
    ck = $.post("/api/login/",
        {
          t: urlp.access_token
        },
        function (data, status) {
          if (data.r == 'OK') {
              window.dog_info=data.r.c;
              ii=data.token;
              localStorage.setItem("i",ii);
              window.location.href="auth.html";
          }
          else
          {
            alert("错误调用！");
          }
        })
    }

