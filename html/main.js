Nowpath = window.location.pathname;
console.log(Nowpath);
shu = Nowpath.split("/");

window.addEventListener('popstate', function (e) {
    dogroute(location.href, false);
});



window.onload = function () {
    adddoglink();
    dogroute(location.href, false);
    cklogin()
}



function CommitJSON(URL,data,callback) {
    $.ajax({url: URL,type:"POST",contentType: "application/json",data: JSON.stringify(data),dataType: "json",success: callback});
}



function DogTimeDif(dateDiff) {
    var ResStr;
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分
    if (dayDiff >= 1) {
        ResStr = `${dayDiff}天前 `;
    } else if (hours >= 1) {
        ResStr = `${hours}小时前 `;
    }
    else {
        ResStr = `${minutes}分钟前 `
    }
    return ResStr;
}

function getDogDateTime(timedog) {
    postTime = new Date(timedog);
    nowdog = new Date();
    postTime2 = DogTimeDif(nowdog - postTime);
    TimeStringDoge2 = postTime.toLocaleString();
    DogDateTime = postTime2 + TimeStringDoge2;
    return DogDateTime;
}

async function getUserInfo(uid) {
    if (!window.doglist) {
        window.doglist = {};
    }
    if (window.doglist[uid]) {
        return window.doglist[uid];
    } else {
        res = await CommitJSON(APIURL+"/api/getd/", {
            t: uid
        });
        if (res.r == "OK" && res.c) {
            window.doglist[uid] = res.c;
            return res.c;
        } else {
            console.log("错误");
            return null;
        }
    }
}


function cklogin() {
    doginfo = localStorage.getItem("doginfo");
    if (doginfo) {
        // console.log(doginfo);
        infodog=JSON.parse(doginfo);
        const loginbt=document.getElementById("usernamedog");
        loginbt.innerText=infodog.name;
        loginbt.href="/home/";
    } else {
        const loginbt=document.getElementById("usernamedog");
        loginbt.href="/static/auth.html";
    }
}

function CMarkDown(indog) {
    var dhtml = marked.parse(indog);
    return DOMPurify.sanitize(dhtml);
}

function CQues(indog) {
    return DOMPurify.sanitize(indog);
}
