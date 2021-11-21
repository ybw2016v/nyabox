function MoreDogItem() {
    window.dogNum += 1;
    addPage(window.dogNum);
}

function showMainPage() {
    // Qurl="http://127.0.0.1:5000/api/list/";
    console.log("showMainPage");
    $("#footdoge").html("");
    $("#main").html("");
    window.dogNum = 0;
    addPage(window.dogNum);
}

function addPage(N = 0) {
    ck = $.post(APIURL+"/api/list/",
        {
            y: N
        },
        function (data, status) {
            if (data.r == "OK") {
                if (data.res.length == 0) {
                    MoredogHtml = '<p class="dixian">我是有底线的</p>';
                    $("#footdoge").html(MoredogHtml);
                } else {
                    for (let idog = 0; idog < data.res.length; idog++) {
                        const item = data.res[idog];
                        const dogavatar = item.user.avatar ? item.user.avatar : "https://www.dogcraft.top/noface.png";
                        postTime = new Date(item.time);
                        nowdog = new Date();
                        postTime2 = DogTimeDif(nowdog - postTime);
                        TimeStringDoge2 = postTime.toLocaleString();
                        DogDateTime = postTime2 + TimeStringDoge2;
                        CardHtml = `<div class="card">
                        <div class="card-body" id="${item.id}">
                            <img id="avatar-${item.id}" src="${dogavatar}" class="dogavatar"><span class="dogname"><a href="/page/u/${item.user.uid}">${item.user.name}</a></span>
                            <span class="posttime badge badge-pill badge-info">${DogDateTime} </span>
            
                            <div class="contain cont ">
                                回答了问题：<br>
                                <a href="/page/q/${item.id}" target="_blank">${item.c}</a>
                            </div>
    
                        </div>
                    </div>`;
                        $("#main").append(CardHtml);
                        MoredogHtml = '<button class="moredog" onclick="MoreDogItem()" id="ansdog">MORE 查看更多</button>';
                        $("#footdoge").html(MoredogHtml);
                    }

            } 
            }


        })

        }
