function AddAdminInfo(token) {
    $("#footdoge").html("");
    CommitJSON(APIURL + "/api/i/", {
        "i": token
    }, function (data, status) {
        if (data.r == "OK") {
            if (!data.c.isAdmin) {
                alert("错误，没有管理员权限");
                window.location.href = "./";
            }
            var AdminHomeHtml = `<div class="card">
            <div class="card-body" id="${data.c.uid}">
                <img id="avatar-${data.c.uid}" src="${data.c.avatar}" class="dogavatar"><span class="dogname"><a href="/u/${data.c.uid}">管理员: ${data.c.name}</a></span>
                <span class="posttime badge badge-pill badge-info">${data.c.nid}@m.dogcraft.top</span>

                <div class="contain cont ques" id="text-${data.c.uid}">
                </div>
                <hr>
            </div>
            <div class="card-footer">
                <span class="uquadog"> uid: 
                ${data.c.uid}  &nbsp mid : ${data.c.mid}</span>
            </div>

        </div>
        
        <div id="hdlt"><div class="container mqus">
        <h5>问答管理</h5>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a id="ql1" class="nav-link active" href="javascript:void(0)">全部问题</a>
            </li>
            <li class="nav-item">
                <a id="ql2" class="nav-link" href="javascript:void(0)">全部回答</a>
            </li>
        </ul>
    </div>
    <div id="admindoglist"></div>
    </div>`;
            $("#main").html(AdminHomeHtml);
            document.getElementById(`text-${data.c.uid}`).innerText = data.c.text;
            window.token = token;
            window.homepage = 0;
            window.qltype = "ql1";
            AddAdminQ1(0);
            const Dql1 = document.getElementById("ql1");
            Dql1.addEventListener("click", function () { AddAdminQ1(); });
            const Dql2 = document.getElementById("ql2");
            Dql2.addEventListener("click", function () { AddAdminQ2(); });

        } else {
            alert("错误，该服务暂不可用");
            window.location.href = "/";
        }
    });

}

function AddAdminQ1(N = 0) {
    //所有问答
    window.qltype = "ql1";
    const Dql1 = document.getElementById("ql1");
    Dql1.className = "nav-link active";
    const Dql2 = document.getElementById("ql2");
    Dql2.className = "nav-link";
    CommitJSON(APIURL + "/api/admin/list/", {
        "i": window.token,
        "y": N
    }, function (data, status) {
        if (data.r == "OK") {
            // console.log(data.c);
            window.homepage = N;
            AdminAddQ(data);
        }
    }
    );
}

function AddAdminQ2(N = 0) {
    //所有问答
    window.qltype = "ql2";
    const Dql1 = document.getElementById("ql1");
    const Dql2 = document.getElementById("ql2");
    Dql2.className = "nav-link active";
    Dql1.className = "nav-link";
    CommitJSON(APIURL + "/api/admin/lsan/", {
        "i": window.token,
        "y": N
    }, function (data, status) {
        if (data.r == "OK") {
            // console.log(data.c);
            window.homepage = N;
            AdminAddA(data);
        }
    }
    );
}

function AdminAddQ(data) {
    $("#admindoglist").html("");
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
        $("#admindoglist").html(DogHomeListHtnl);
    }
    else {
        for (i = 0; i < data.res.length; i++) {
            const item = data.res[i];
            var AnsHtml = "";
            if (item.hid) {
                for (let j = 0; j < item.ans.length; j++) {
                    const ansdogitem = item.ans[j];
                    const adtmm = getDogDateTime(ansdogitem.time);
                    AnsHtml += `<hr><div class="contain  ques" id="${ansdogitem.id}">
                    ${CMarkDown(ansdogitem.c)}
                </div>
                <div><button type="button" class="btn btn-primary" qid="${ansdogitem.id}" onclick="ADelQues(this);">
                删除
            </button>
            <button type="button" class="btn btn-primary" qid="${ansdogitem.id}" onclick="UpdateQA(this);">
                修改
            </button></div>
                <div class="admindogtitm">${adtmm}</div>
                
                `;
                }

            }
            const qdtime=getDogDateTime(item.time);
            const Iadminhtml = `<div class="card">
            <div class="card-body" id="${item.id}">
                <h6>Q:</h6>
                <div class="contain  ques" id="QT${item.id}">
                    ${CQues(item.c)}
                </div>
                <hr>
                <div class="contain  ques" id="A-${item.id}">
            <button type="button" class="btn btn-primary" qid="${item.id}" onclick="ADelQues(this);">
                删除
            </button>
            <button type="button" class="btn btn-primary" qid="${item.id}" onclick="UpdateQA(this);">
                修改
            </button>
            
                </div>
                <hr>
                <h6>A:</h6>
                ${AnsHtml}
                <hr>
            
            </div>
            
            <div class="card-footer">
                <span class="uquadog"> 提问时间:${qdtime}
                    <br> 
        </div>`;
            $("#admindoglist").append(Iadminhtml);


        }
    }

    AFenYe(data.num);
}


function AdminAddA(data) {
    $("#admindoglist").html("");
    if ((data.res.length == 0) || (data.num == 0)) {
        DogHomeListHtnl = `<div class="card">
                <div class="card-body" id="notfound">
                    <div class="contain ">
                        <h2 class="text-center sdkldog">404 NotFound</h2>
                        <h4 class="sdkldog">没有回答了</h4>
                        <br>
                        <div class="img text-center"><img  src="https://a.neko.red/ep/404.png" alt=""></div>
                        
                    </div>
                </div>
            </div>`;
        $("#admindoglist").html(DogHomeListHtnl);
    }
    else {
        for (const item of data.res) {
            const adtmm = getDogDateTime(item.time);
            AnsAllHtml=`<div class="card">
            <div class="card-body" id="${item.id}">
                <p>id:${item.id}</p>
                <p>uid:<a href="/u/${item.uid}">${item.uid}</a></p>
                <p>qid:<a href="/q/${item.qid}">${item.qid}</a></p>

                <hr>
                <h6>A:</h6>
                ${CMarkDown(item.c)}
                <hr>
            <div class="contain  ques" id="A-${item.id}">
            <button type="button" class="btn btn-primary" qid="${item.id}" onclick="ADelQues(this);">
                删除
            </button>
            <button type="button" class="btn btn-primary" qid="${item.id}" onclick="UpdateQA(this);">
                修改
            </button>
                </div>
            </div>
            
            <div class="card-footer">
                <span class="uquadog"> 回答时间:${adtmm}
                    <br> 
        </div>`;
        $("#admindoglist").append(AnsAllHtml);
        }

    }
    AFenYe(data.num);
}

function AFenYe(num) {
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
    QianYiYe.addEventListener("click", function () { AQian(); });
    HouYiYe.addEventListener("click", function () { AHou(); });
    YeHtml.appendChild(QianYiYe);
    YeHtml.appendChild(HouYiYe);
    $("#footdoge").html(YeInfo);
    $("#footdoge").append(YeHtml);
}
function AQian() {
    if (window.homepage == 0) {
        // QianYiYe.className="page-item disabled";
        return "dog";
    }
    switch (window.qltype) {
        case "ql1":
            AddAdminQ1(window.homepage - 1);
            break;
        case "ql2":
            AddAdminQ2(window.homepage - 1);
            break;
        // case "ql3":
        //     AddAdminQ1(window.homepage - 1);
        //     break;
        default:
            AddAdminQ1(window.homepage - 1);
            break;
    }
}
function AHou() {
    if (window.homepage == window.MaxPage - 1) {
        // HouYiYe.className="page-item disabled";
        return "dog";
    }
    switch (window.qltype) {
        case "ql1":
            AddAdminQ1(window.homepage + 1);
            break;
        case "ql2":
            AddAdminQ2(window.homepage + 1);
            break;
        // case "ql3":
        //     AddUserQ3(window.homepage + 1);
        //     break;
        default:
            AddAdminQ1(window.homepage + 1);
            break;
    }
}


function ADelQues(eldog) {
    console.log("DEL");
    // console.log(this);
    const qid = eldog.getAttribute("qid");
    const rmdogimnfo = `确定删除${qid}及其相关回答吗？\n\n请注意，删除后不可恢复。`;
    if (confirm(rmdogimnfo)) {
        token = localStorage.getItem("i");
        CommitJSON(APIURL + "/api/admin/rmqa/", {
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

function showAdminPage() {
    token = localStorage.getItem("i");
    if (token) {
        AddAdminInfo(token);
    } else {
        alert("请先登录");
        window.location.href = "/static/auth.html";
    }
}