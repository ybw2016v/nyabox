function AddHomeUserInfo(token) {
    $("#footdoge").html("");
    CommitJSON(APIURL + "/api/i/", {
        "i": token
    }, function (data, status) {
        if (data.r == "OK") {
            // console.log(data.c);
            UserHomeHtml = `<div class="card">
            <div class="card-body" id="${data.c.uid}">
                <img id="avatar-${data.c.uid}" src="${data.c.avatar}" class="dogavatar"><span class="dogname"><a href="/u/${data.c.uid}">${data.c.name}</a></span>
                <span class="posttime badge badge-pill badge-info">${data.c.nid}@m.dogcraft.top</span>

                <div class="contain cont ques" id="text-${data.c.uid}">
                </div>
                <hr>
                <button type="button" class="btn btn-primary" id="Quitsdog" data-target="#Quit">
                    退出登录
                </button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Setting">
                    设置
                </button>
            </div>
            <div class="card-footer">
                <span class="uquadog"> uid: 
                ${data.c.uid}  &nbsp mid : ${data.c.mid}</span>
            </div>

        </div>

        <div class="modal fade" id="Anse">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- 模态框头部 -->
                    <div class="modal-header">
                        <h4 class="modal-title">我要回答</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- 模态框主体 -->
                    <div class="modal-body">
                    <label for="comment">Q:</label>
                    <div id="quesdog">
                    </div>
                    <hr>
                        <div class="form-group">
                            <label for="comment">A:</label>
                            <textarea class="form-control" placeholder="有什么想说的？" name="" id="AAns" rows="4"></textarea>
                        </div>

                    </div>
                    <div id="Loading"></div>

                    <!-- 模态框底部 -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="ansb" >回答</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="Setting">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- 模态框头部 -->
                    <div class="modal-header">
                        <h4 class="modal-title">设定</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- 模态框主体 -->
                    <div class="modal-body">
                    <label for="comment">接受新问题:</label>
                    <div id="quesdog">
                    </div>
                    <hr>
                    <form name="S1f">
                    <label class="radio-inline"><input type="radio" id="acpt0" name="isAceptt" ${data.c.isAccept ? "checked" : ""}>接受提问</label>
                    <label class="radio-inline"><input type="radio" id="acpt1" name="isAceptt" ${data.c.isAccept ? "" : "checked"} >不再接受提问</label>
                    </form>
                    <br>

                    <label for="comment">隐藏账号:</label>
                    <div id="quesdog">
                    </div>
                    <hr>
                    <form name="S2f">
                    <label class="radio-inline"><input type="radio" id="show0" name="isShow" ${data.c.isShow ? "checked" : ""}>不隐藏</label>
                    <label class="radio-inline"><input type="radio" id="show1" name="isShow" ${data.c.isShow ? "" : "checked"} >隐藏</label>
                  </form>

                    </div>
                    <div id="Loading"></div>

                    <!-- 模态框底部 -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="set" >确定</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    </div>

                </div>
            </div>
        </div>


        <div id="hdlt"><div class="container mqus">
        <h5>我的问题</h5>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a id="ql1" class="nav-link active" href="javascript:void(0)">未回答问题</a>
            </li>
            <li class="nav-item">
                <a id="ql2" class="nav-link" href="javascript:void(0)">全部问题</a>
            </li>
            <li class="nav-item">
                <a id="ql3" class="nav-link" href="javascript:void(0)">已回答问题</a>
            </li>
        </ul>
    </div>
    <div id="homedogqlist"></div>
    </div>
        `;
            $("#main").html(UserHomeHtml);
            document.getElementById(`text-${data.c.uid}`).innerText = data.c.text;
            window.token = token;
            window.homepage = 0;
            window.qltype = "ql1";
            document.getElementById("ansb").addEventListener("click", PostAns);
            const Dql1 = document.getElementById("ql1");
            Dql1.addEventListener("click", function () { AddUserQ1(); });
            const Dql2 = document.getElementById("ql2");
            Dql2.addEventListener("click", function () { AddUserQ2(); });
            const Dql3 = document.getElementById("ql3");
            Dql3.addEventListener("click", function () { AddUserQ3(); });
            const Upset = document.getElementById("set");
            Upset.addEventListener("click", function () { UpdateUserSet(); });
            const Quitdogs=document.getElementById("Quitsdog");
            Quitdogs.addEventListener("click",function(){QuitLogin();});
            AddUserQ1();
            
        }
        else {
            alert("错误，该服务暂不可用");
            window.location.href = "/";
        }
    }),dataType="json"
}

function AddUserQ1(N = 0) {
    //未回答问题
    window.qltype = "ql1";
    const Dql1 = document.getElementById("ql1");
    Dql1.className = "nav-link active";
    const Dql2 = document.getElementById("ql2");
    Dql2.className = "nav-link";
    const Dql3 = document.getElementById("ql3");
    Dql3.className = "nav-link";
    CommitJSON(APIURL + "/api/lmqa/", {
        "i": window.token,
        "type": "b",
        "y": N
    }, function (data, status) {
        if (data.r == "OK") {
            // console.log(data.c);
            window.homepage = N;
            AddQl(data);

        }
    }
    );
}


function AddUserQ2(N = 0) {
    //全部回答问题
    window.qltype = "ql2";
    const Dql1 = document.getElementById("ql1");
    Dql1.className = "nav-link";
    const Dql2 = document.getElementById("ql2");
    Dql2.className = "nav-link active";
    const Dql3 = document.getElementById("ql3");
    Dql3.className = "nav-link";
    CommitJSON(APIURL + "/api/lmqa/", {
        "i": window.token,
        "type": "0",
        "y": N
    }, function (data, status) {
        if (data.r == "OK") {
            // console.log(data.c);

            window.homepage = N;
            AddQl(data);
        }
    }
    );
}

function AddUserQ3(N = 0) {
    //已回答回答问题
    window.qltype = "ql3";
    const Dql1 = document.getElementById("ql1");
    Dql1.className = "nav-link";
    const Dql2 = document.getElementById("ql2");
    Dql2.className = "nav-link";
    const Dql3 = document.getElementById("ql3");
    Dql3.className = "nav-link active";
    CommitJSON(APIURL + "/api/lmqa/", {
        "i": window.token,
        "type": "a",
        "y": N
    }, function (data, status) {
        if (data.r == "OK") {
            // console.log(data.c);
            window.homepage = N;
            AddQl(data);
        }
    }
    );
}


function AddQl(data) {
    $("#homedogqlist").html("");
    if ((data.res.length == 0) || (data.num == 0)) {
        DogHomeListHtnl = `<div class="card">
                <div class="card-body" id="notfound">
                    <div class="contain ">
                        <h2 class="text-center sdkldog">404 NotFound</h2>
                        <h4 class="sdkldog">没有问题</h4>
                        <br>
                        <div class="img text-center"><img  src="https://a.neko.red/ep/404.png" alt=""></div>
                        
                    </div>
                </div>
            </div>`;
        $("#homedogqlist").html(DogHomeListHtnl);
    } else {
        for (i = 0; i < data.res.length; i++) {
            const item = data.res[i];
            // console.log(item);
            if (item.hid) {
                qdtime = getDogDateTime(item.time);
                adtime = getDogDateTime(item.ans.time);
                DogHomeListHtnl = `<div class="card">
                    <div class="card-body" id="${item.id}">
                        <h6>Q:</h6>
                        <div class="contain  ques" id="QT${item.id}">
                            ${CQues(item.c)}
                        </div>
                        <hr>
                        <h6>A:</h6>
                        <div class="contain  ques" id="${item.ans.id}">
                            ${CMarkDown(item.ans.c)}
                        </div>
                        <hr>
                    <div class="contain  ques" id="A-${item.id}">
                        <button type="button" class="btn btn-primary" qid="${item.id}" onclick="AnsQues(this);">
                            重新回答
                    </button>
                    <button type="button" class="btn btn-primary" qid="${item.id}" onclick="DelQues(this);">
                        删除
                    </button>
                    <button type="button" class="btn btn-primary" qid="${item.id}" onclick="ShareQues(this);">
                        分享
                    </button>
                        </div>
                    </div>
                    
                    <div class="card-footer">
                        <span class="uquadog"> 提问时间:${qdtime}
                            <br> 
                            回答时间:${adtime}</span>
                    </div>
                </div>`;

            } else {
                qdtime = getDogDateTime(item.time);
                DogHomeListHtnl = `<div class="card">
                    <div class="card-body" id="${item.id}">
                        <h6>Q:</h6>
                        <div class="contain  ques" id="QT${item.id}">
                            ${item.c}
                        </div>
                        <hr>
        
                        <div class="contain  ques" id="A-${item.id}">
                        <button type="button" class="btn btn-primary" qid="${item.id}" onclick="AnsQues(this);">
                            回答
                    </button>
                    <button type="button" class="btn btn-primary" qid="${item.id}" onclick="DelQues(this);">
                        删除
                    </button>
                    
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="uquadog"> 提问时间:${qdtime}
                            </span>
                    </div>
    
                </div>`;
            }
            $("#homedogqlist").append(DogHomeListHtnl);
        }
    }
    FenYe(data.num);
}

function FenYe(num) {
    const MaxPage = Math.ceil(num / 10);
    window.MaxPage = MaxPage;
    YeInfo = document.createElement("div");
    YeInfo.innerText = `共${MaxPage}页 第${window.homepage + 1}页`;
    YeHtml = document.createElement("ul");
    YeHtml.className = "pagination justify-content-center";
    QianYiYe = document.createElement("li");
    QianYiYe.className = "page-item";
    QianYiYe.innerHTML = `<a class="page-link" href="javascript:void(0);">前一页</a>`;
    HouYiYe = document.createElement("li");
    HouYiYe.className = "page-item";
    HouYiYe.innerHTML = `<a class="page-link" href="javascript:void(0);">后一页</a>`;
    if (window.homepage == 0) {
        QianYiYe.className = "page-item disabled";
    }
    if (window.homepage == window.MaxPage - 1) {
        HouYiYe.className = "page-item disabled";
    }
    QianYiYe.addEventListener("click", function () { Qian(); });
    HouYiYe.addEventListener("click", function () { Hou(); });
    YeHtml.appendChild(QianYiYe);
    YeHtml.appendChild(HouYiYe);
    $("#footdoge").html(YeInfo);
    $("#footdoge").append(YeHtml);
}
function Qian() {
    if (window.homepage == 0) {
        // QianYiYe.className="page-item disabled";
        return "dog";
    }
    switch (window.qltype) {
        case "ql1":
            AddUserQ1(window.homepage - 1);
            break;
        case "ql2":
            AddUserQ2(window.homepage - 1);
            break;
        case "ql3":
            AddUserQ3(window.homepage - 1);
            break;
        default:
            AddUserQ1(window.homepage - 1);
            break;
    }
}
function Hou() {
    if (window.homepage == window.MaxPage - 1) {
        // HouYiYe.className="page-item disabled";
        return "dog";
    }
    switch (window.qltype) {
        case "ql1":
            AddUserQ1(window.homepage + 1);
            break;
        case "ql2":
            AddUserQ2(window.homepage + 1);
            break;
        case "ql3":
            AddUserQ3(window.homepage + 1);
            break;
        default:
            AddUserQ1(window.homepage + 1);
            break;
    }
}

function AnsQues(dog) {
    const qid = dog.getAttribute("qid");
    document.getElementById("ansb").setAttribute("qid", qid);
    document.getElementById("quesdog").innerText = document.getElementById(`QT${qid}`).innerText;
    $("#Loading").text("");
    $("#Anse").modal("show");
}
function PostAns() {
    console.log("POS");
    // console.log(this);
    const qid = this.getAttribute("qid");
    const ans = document.getElementById("AAns").value;
    CommitJSON(APIURL + "/api/create/", {
        "type": "a",
        "i": window.token,
        "c": ans,
        "t": qid
    }, function (data, status) {
        if (data.r == "OK") {
            // alert("提问成功，请耐心等待回答。");
            if (confirm("是否分享到timeline")) {
                const niddog=localStorage.getItem("doginfo");
                const dognid=JSON.parse(niddog).nid;
                const burl=location.origin;
                const qcontent = document.getElementById(`QT${qid}`).innerText;
                const sharetext=`回答了问题:\n[${qcontent}](${burl}/q/${qid})\n我的提问箱:\n${burl}/u/@${dognid}`;
                const sharedog=encodeURIComponent(sharetext);
                location.href=`${MISSKEY_URL}share/?text=${sharedog}`;
            } else {
                
            }
            const SHtml = `<div class="alert alert-success alert-dismissible fade show">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>回答成功!回答ID： ${data.id}</strong> 
          </div>`;
            $("#main").prepend(SHtml);
            $("#Anse").click();
        } else {
            alert("回答失败，该服务暂不可用。");
            $("#Anse").click();
        }
    });
    $("#Loading").text("Loading……");
}

function UpdateUserSet() {
    console.log("UpdateSeeting");
    token = localStorage.getItem("i");
    const newAcept = document.getElementById("acpt0").checked;
    const newShow = document.getElementById("show0").checked;

    $.ajax({
        url: (APIURL + "/api/chus/"), type: "POST",
         contentType: "application/json",
         dataType:"json", 
         data: JSON.stringify({
            "i": token,
            "isAccept": newAcept,
            "isShow": newShow
        }), success: function (data, status) {
            if (data.r == "OK") {
                alert("设置成功！");
            } else {
                alert("设置失败，该服务暂不可用。");
            }
            $("#Setting").click();
        }
    });
}


function DelQues(eldog) {
    console.log("DEL");
    // console.log(this);
    const qid = eldog.getAttribute("qid");
    const rmdogimnfo = `确定删除${qid}及其相关回答吗？\n\n请注意，删除后不可恢复。`;
    if (confirm(rmdogimnfo)) {
        token = localStorage.getItem("i");
        CommitJSON(APIURL + "/api/rmqa/", {
            "i": token,
            "t": qid
        }, function (data, status) {
            if (data.r == "OK") {
                alert("删除成功.");
                dogroute(location.href, false);

                // window.location.href /= "./";
            } else {
                alert("删除失败，该服务暂不可用。");
            }
        });
    }
    else {

    }
}

function ShareQues(eldog) {
    console.log("SHARE");
    const niddog=localStorage.getItem("doginfo");
    const dognid=JSON.parse(niddog).nid;
    const qid = eldog.getAttribute("qid");
    const burl=location.origin;
    const qcontent = document.getElementById(`QT${qid}`).innerText;
    const sharetext=`回答了问题:\n[${qcontent}](${burl}/q/${qid})\n我的提问箱:\n${burl}/u/@${dognid}`;
    const sharedog=encodeURIComponent(sharetext);
    location.href=`${MISSKEY_URL}share/?text=${sharedog}`;
}


function showHomePage() {
    token = localStorage.getItem("i");
    if (token) {
        AddHomeUserInfo(token);
    } else {
        alert("请先登录");
        window.location.href = "/static/auth.html";
    }
}
function QuitLogin() {
    if (confirm("确定要退出登录吗？")) {
        localStorage.removeItem("i");
        location.reload();
    } else {
        console.log("取消退出登录。");
    }
}
