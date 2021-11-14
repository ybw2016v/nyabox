function AddHomeUserInfo(token) {
    $("#footdoge").html("");
    $.post("http://127.0.0.1:5000/api/i/", {
        "i": token
    }, function (data, status) {
        if (data.r == "OK") {
            // console.log(data.c);
            UserHomeHtml = `<div class="card">
            <div class="card-body" id="${data.c.uid}">
                <img id="avatar-${data.c.uid}" src="${data.c.avatar}" class="dogavatar"><span class="dogname">${data.c.name}</span>
                <span class="posttime badge badge-pill badge-info">${data.c.nid}@m.dogcraft.top</span>

                <div class="contain cont ques" id="text-${data.c.uid}">
                </div>
                <hr>
                <button type="button" class="btn btn-primary" data-target="#Ques">
                    退出登录
                </button>
                <button type="button" class="btn btn-primary" data-target="#Ques">
                    设置
                </button>
            </div>
            <div class="card-footer">
                <span class="uquadog"> uid: 
                ${data.c.uid}  &nbsp mid : ${data.c.mid}</span>
            </div>

        </div>
        <div id="hdlt"><div class="container mqus">
        <h5>我的问题</h5>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a id="ql1" class="nav-link active" href="javascript:void(0)">未回答问题</a>
            </li>
            <li class="nav-item">
                <a id="ql2" class="nav-link" href="javascript:void(0)">全部回答问题</a>
            </li>
            <li class="nav-item">
                <a id="ql3" class="nav-link" href="javascript:void(0)">已回答回答问题</a>
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
            const Dql1 = document.getElementById("ql1");
            Dql1.addEventListener("click", function () { AddUserQ1(); });
            const Dql2 = document.getElementById("ql2");
            Dql2.addEventListener("click", function () { AddUserQ2(); });
            const Dql3 = document.getElementById("ql3");
            Dql3.addEventListener("click", function () { AddUserQ3(); });
            AddUserQ1();
        }
        else {
            alart("错误，该服务暂不可用");
            window.location.href = "/";
        }
    })
}

function AddUserQ1(N = 0) {
    //未回答问题
    const Dql1 = document.getElementById("ql1");
    Dql1.className = "nav-link active";
    const Dql2 = document.getElementById("ql2");
    Dql2.className = "nav-link";
    const Dql3 = document.getElementById("ql3");
    Dql3.className = "nav-link";
    $.post("http://127.0.0.1:5000/api/lmqa/", {
        "i": window.token,
        "type": "b",
        "y": N
    }, function (data, status) {
        if (data.r == "OK") {
            // console.log(data.c);
            AddQl(data);
        }
    }
    );
}


function AddUserQ2(N = 0) {
    //全部回答问题
    const Dql1 = document.getElementById("ql1");
    Dql1.className = "nav-link";
    const Dql2 = document.getElementById("ql2");
    Dql2.className = "nav-link active";
    const Dql3 = document.getElementById("ql3");
    Dql3.className = "nav-link";
    $.post("http://127.0.0.1:5000/api/lmqa/", {
        "i": window.token,
        "type": "0",
        "y": N
    }, function (data, status) {
        if (data.r == "OK") {
            // console.log(data.c);
            AddQl(data);
        }
    }
    );
}

function AddUserQ3(N = 0) {
    //已回答回答问题
    const Dql1 = document.getElementById("ql1");
    Dql1.className = "nav-link";
    const Dql2 = document.getElementById("ql2");
    Dql2.className = "nav-link";
    const Dql3 = document.getElementById("ql3");
    Dql3.className = "nav-link active";
    $.post("http://127.0.0.1:5000/api/lmqa/", {
        "i": window.token,
        "type": "a",
        "y": N
    }, function (data, status) {
        if (data.r == "OK") {
            // console.log(data.c);
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
                        qdtime=getDogDateTime(item.time);
                        adtime=getDogDateTime(item.ans.time);
                        DogHomeListHtnl = `<div class="card">
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
                        <hr>
                    <div class="contain  ques" id="A-${item.id}">
                        <button type="button" class="btn btn-primary" qid="${item.id}" onclick="AnsQues(this);">
                            重新回答
                    </button>
                    <button type="button" class="btn btn-primary" qid="${item.id}" onclick="DelQues(this);">
                        删除
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
                        qdtime=getDogDateTime(item.time);
                        DogHomeListHtnl = `<div class="card">
                    <div class="card-body" id="${item.id}">
                        <h6>Q:</h6>
                        <div class="contain  ques">
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

}
