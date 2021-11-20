APIurl = "";

Nowpath = window.location.pathname;

console.log(Nowpath);
shu = Nowpath.split("/");

window.addEventListener('popstate', function (e) {
    dogroute(location.href, false);
});



window.onload = function () {
    adddoglink();
    dogroute(location.href, false);
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
        res = await $.post("http://127.0.0.1:5000/api/getd/", {
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



function checkurl(e) {
    e.preventDefault();
    // console.log(e.target.href);
    dogroute(e.target.href);
}


function dogroute(doge, ldog = true) {
    dogurl = new URL(doge);
    if (dogurl.origin == location.origin) {
        const dogpath = dogurl.pathname;
        const shu = dogpath.split("/");
        if (ldog) {
            history.pushState({ "page": dogpath }, shu[2], doge);
        }
        switch (shu[2]) {
            case "u":
            case "user":
                showUserPage();
                break;
            case "home":
                showHomePage();
                break;
            case "login":
                showLoginPage();
                break;
            case "about":
                showAboutPage();
                break;
            case "cb":
                showCbPage();
                break;
            case "q":
            case "ques":
                showQuesPage();
                break;
            default:
                showMainPage();
                break;
        }
    }
    else {
        location.href = doge;
    }
}


function doglink(dohu) {
    console.log(dohu);

    if (dohu != null) {
        var allLink = dohu.querySelectorAll('a');
    } else {
        console.log("dog");
        var allLink = document.querySelectorAll('a');
    }
    for (let i = 0, len = allLink.length; i < len; i++) {
        const ldog = allLink[i];
        if (ldog.hasAttribute('dogroute')) {
            // ldog.addEventListener('click', checkurl);
        } else {
            ldog.setAttribute('dogroute', true);
            ldog.addEventListener('click', checkurl, false);
        }
    }
}

function adddoglink() {
    doglink();
    const ddogpage = document.body;
    const config = { attributes: false, childList: true, subtree: true };
    const observer = new MutationObserver(callback);
    observer.observe(ddogpage, config);
}

var callback = function (mutationsList) {
    mutationsList.forEach(function (item, index) {
        if (item.type == 'childList') {
            item.addedNodes.forEach(function (item, index) {
                if (item.querySelectorAll) {
                    doglink(item);
                }
            });
        }
    });
}
