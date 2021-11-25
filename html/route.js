function checkurl(e) {
    e.preventDefault();
    // console.log(e.target.href);
    dogroute(e.target.href);
}


function dogroute(doge, ldog = true) {
    // console.log(doge);
    dogurl = new URL(doge);
    if (dogurl.origin == location.origin) {
        const dogpath = dogurl.pathname;
        const shu = dogpath.split("/");
        console.log(shu);
        if (ldog) {
            history.pushState({ "page": dogpath }, shu[1], doge);
        }
        switch (shu[1]) {
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
            case "static":
                location.href=doge;
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
