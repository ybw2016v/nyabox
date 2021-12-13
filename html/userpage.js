function showUserPage(uid) {
    $("#main").html("");
    $("#footdoge").html("");
    window.UserAnsNum=0;
    if (uid) {
        console.log(uid);
    }
    else {
        Nowpath = window.location.pathname;
    console.log(Nowpath);
    shu = Nowpath.split("/");
    uid = shu[2];
    }
    window.uid = uid;
    AddUserAns(uid,window.UserAnsNum);
}

function PostQuse(dogs) {
    // console.log(dogs);
    const Ques=document.getElementById("QQues").value;

    CommitJSON(APIURL+"/api/create/",{
        "type":"q",
        "c":Ques,
        "t":window.uid
    },function (data,status) {
        if (data.r=="ok") {
            alert("提问成功，请耐心等待回答。");
            const SHtml=`<div class="alert alert-success alert-dismissible fade show">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>提问成功!问题ID： ${data.qid}</strong> 
          </div>`;
            $("#main").prepend(SHtml);
            $("#Ques").click();
            document.getElementById("QQues").value="";
        } else {
            alert("提问失败，该服务暂不可用。");
            $("#Ques").click();
        }
    });
    // $("#Loading").text("Loading……");

    
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
        CommitJSON(APIURL+"/api/getd/", {
            t: uid
        }, function (data, status) {
            if (data.r == "OK") {
                document.title = `${data.c.name} 的提问箱`;
                UserCardHtml = `<div class="card">
                <div class="card-body" id="${data.c.uid}">
                    <img id="avatar-${data.c.uid}" src="${data.c.avatar}" class="dogavatar"><span class="dogname"><a href="/u/${data.c.uid}">${data.c.name}</a></span>
                    <span class="posttime badge badge-pill badge-info"><a href="https://m.dogcraft.top/users/${data.c.mid}">${data.c.nid}@m.dogcraft.top</a></span>
    
                    <div class="contain cont ques" id="text-${data.c.uid}">
                    </div>
                    <hr>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Ques" ${data.c.isAccept?"":"disabled"} >
                    ${data.c.isAccept?"我要提问":"提问已关闭"}
                    </button>
                </div>
                <div class="card-footer">
                    <span class="uquadog"> uid: 
                    ${data.c.uid}  &nbsp mid : ${data.c.mid}</span>
                </div>
    
            </div>
            <div class="modal fade" id="Ques">
            <div class="modal-dialog">
                <div class="modal-content">

                    <!-- 模态框头部 -->
                    <div class="modal-header">
                        <h4 class="modal-title">我要提问</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- 模态框主体 -->
                    <div></div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="comment">Q:</label>
                            <textarea class="form-control" placeholder="???" name="" id="QQues" rows="4"></textarea>
                        </div>

                    </div>
                    <div id="Loading"></div>

                    <!-- 模态框底部 -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="PostQuse(this);">提问</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    </div>

                </div>
            </div>
        </div>
            `;
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
    CommitJSON(APIURL+"/api/lsqa/",
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
                            ${CMarkDown(item.ans.c)}
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="uquadog"> 提问时间:${qdtime}
                            <br> 
                            回答时间:${adtime}</span>
                    </div>
    
                </div>`;
                        $("#main").append(UserAnsHtml);
                    }
                        MoredogHtml = `<button class="moredog" onclick="MoreUserAns(this)" id="ansdog" uid="${uid}">MORE 查看更多</button>`;
                        $("#footdoge").html(MoredogHtml);
                    }

                }

            }
    );
}
