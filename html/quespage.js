function addQues(data, doginfo) {
    postTime = new Date(data.res.time);
    nowdog = new Date();
    postTime2 = DogTimeDif(nowdog - postTime);
    TimeStringDoge2 = postTime.toLocaleString();
    DogDateTime = postTime2 + TimeStringDoge2;
    let QuesCardHtml = `<div class="card">
                    <div class="card-body" id="${data.res.id}">
                    <div class="contain ">
                    <span class="qdogname" id="${data.res.tid}">${doginfo.name}</span><span>收到了问题:</span>
                    </div>
                    <hr>
                    <div>
                    ${data.res.c}
                    </div>
                    </div>
                    <div class="card-footer">
                    <span class="badge badge-pill badge-info">${DogDateTime} </span>
                    </div></div>`;
    $("#main").append(QuesCardHtml);
    if (data.res.hid) {
        $.post(APIURL+"/api/getc/", { "t": data.res.hid }, function (data, status) {
            // console.log(data);
            if (data.r == "OK" && data.res) {
                // console.log(data.res);
                postTime = new Date(data.res.time);
                nowdog = new Date();
                postTime2 = DogTimeDif(nowdog - postTime);
                TimeStringDoge2 = postTime.toLocaleString();
                DogDateTime = postTime2 + TimeStringDoge2;
                AnsCardHtml = `            <div class="card">
                                <div class="card-body" id="${doginfo.uid}">
                                    <img id="avatar-${doginfo.uid}" src="${doginfo.avatar}" class="adogavatar"><span class="adogname">${doginfo.name}</span>
                                    <span class="aposttime badge badge-pill badge-info">${DogDateTime} </span>
                    
                                    <div class="contain cont ques">
                                        回答:
                                        <hr>
                                        <div>
                                            ${data.res.c}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>`;
                $("#main").append(AnsCardHtml);
            }
        })
    }
}



function ShowQues(qid) {
    $("#footdoge").html("");
    $("#main").html("");
    if (!window.doglist) {
        window.doglist = {};
    }
    $.post(`${APIURL}/api/getq/`, { "t": qid },
        function (data, status) {
            if (data.r == "OK" && data.res) {
                var adogid = data.res.tid;
                if (adogid in window.doglist) {
                    // window.doglist={};
                    doginfo = window.doglist[adogid];
                    addQues(data, doginfo);
                } else {
                    var Qinfo = data;
                    $.post(APIURL+"/api/getd/", {
                        t: data.res.tid
                    }, function (data, status) {
                        if (data.r == "OK" && data.c) {
                            window.doglist[data.c.uid] = data.c;
                            doginfo = data.c;
                            addQues(Qinfo, doginfo);
                        }
                    });
                }

            } else {
                // alert("获取问题失败");
                var NotFoundHtml = `<div class="card">
                <div class="card-body" id="notfound">
                    <div class="contain ">
                        <h2 class="text-center sdkldog">404 NotFound</h2>
                        <h4 class="sdkldog">找不到该内容</h4>
                        <br>
                        <div class="img text-center"><img  src="https://a.neko.red/ep/404.png" alt=""></div>
                        
                    </div>
                </div>
            </div>`;
                $("#main").append(NotFoundHtml);
            }

        }
    )
}


function showQuesPage(qid) {
    if (qid) {
        ShowQues(qid);
    } else {
        Nowpath = window.location.pathname;
        console.log(Nowpath);
        shu = Nowpath.split("/");
        qid = shu[3];
        ShowQues(qid);
    }

}
