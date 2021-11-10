function showUserPage(uid) {
    $("#main").html("");
    $("footdoge").html("");
    window.UserAnsNum=0;
    if (uid) {
        console.log(uid);
    }
    else {
        Nowpath = window.location.pathname;
    console.log(Nowpath);
    shu = Nowpath.split("/");
    uid = shu[3];
    }
    AddUserAns(uid,window.UserAnsNum);
}


function MoreUserAns(odog) {
    if (window.UserAnsNum) {
        window.UserAnsNum=0;
    }
    window.UserAnsNum += 1;
    const dogid=odog.getAttribute("uid");
    AddUserAns(dogid,window.UserAnsNum);
}

function AddUserAns(uid, N = 0) {
    if (!window.doglist) {
        window.doglist = {};
    }
    if (N == 0) {
        $.post("http://127.0.0.1:5000/api/getd/", {
            t: uid
        }, function (data, status) {
            if (data.r == "OK") {
                UserCardHtml = `<div class="card">
                <div class="card-body" id="${data.c.uid}">
                    <img id="avatar-${data.c.uid}" src="${data.c.avatar}" class="dogavatar"><span class="dogname">dogcraft</span>
                    <span class="posttime badge badge-pill badge-info">${data.c.nid}@m.dogcraft.top</span>
    
                    <div class="contain cont ques" id="text-${data.c.uid}">
                    </div>
                </div>
                <div class="card-footer">
                    <span class="uquadog"> uid: 
                    ${data.c.uid}  &nbsp mid : ${data.c.mid}</span>
                </div>
    
            </div>`;
                $("#main").prepend(UserCardHtml);
                document.getElementById(`text-${data.c.uid}`).innerText = data.c.text;
            }
            else {
                UserCardHtml = `<div class="card">
                <div class="card-body" id="notfound">
                    <div class="contain ">
                        <h2 class="text-center sdkldog">404 NotFound</h2>
                        <h4 class="sdkldog">找不到该内容</h4>
                        <br>
                        <div class="img text-center"><img  src="https://a.neko.red/ep/404.png" alt=""></div>
                        
                    </div>
                </div>
            </div>`;
                $("#main").prepend(UserCardHtml);
            }
        }
        );
    }
    $.post("http://127.0.0.1:5000/api/lsqa/",
        {
            t: uid,
            y: N
        }, function (data, status) {
            if (data.r == "OK") {
                if (data.res.length == 0) {
                    MoredogHtml = '<p class="dixian">我是有底线的</p>';
                    $("#footdoge").html(MoredogHtml);
                } else {
                    for (let idog = 0; idog < data.res.length; idog++) {
                        const item = data.res[idog];
                        qdtime=getDogDateTime(item.time);
                        adtime=getDogDateTime(item.ans.time);
                        UserAnsHtml = `<div class="card">
                    <div class="card-body" id="${item.id}">
                        <h6>Q:</h6>
                        <div class="contain  ques">
                            ${item.c}
                        </div>
                        <hr>
                        <h6>A:</h6>
        
                        <div class="contain  ques" id="${item.ans.id}">
                            ${item.ans.c}
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="uquadog"> 提问时间:${qdtime}
                            <br> 
                            回答时间:${adtime}</span>
                    </div>
    
                </div>`
                        $("#main").append(UserAnsHtml);
                    }
                        MoredogHtml = `<button class="moredog" onclick="MoreUserAns(this)" id="ansdog" uid="${uid}">MORE 查看更多</button>`;
                        $("#footdoge").html(MoredogHtml);
                    }

                }

            }
    );
}
