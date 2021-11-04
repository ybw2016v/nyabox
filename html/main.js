APIurl="";

Nowpath=window.location.pathname;

console.log(Nowpath);
shu=Nowpath.split("/");


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
    default:
        showMainPage();
        break;
}

function showMainPage(params) {
    Qurl="http://127.0.0.1:5000/api/list/";
}

function addPage(N=0) {
    ck = $.post("http://127.0.0.1:5000/api/list/",
        {
          y: 0
        },
        function (data, status) {
            if (data.r=="OK") {
                for (let idog = 0; idog < data.res.length; idog++) {
                    const item = array[idog];
                    CardHtml=`<div class="card">
                    <div class="card-body" id="${item.id}">
                        <img id="avatar-${item.id}" src="https://www.dogcraft.top/noface.png" class="dogavatar"><span class="dogname">${eledog.name}</span>
                        <span class="posttime badge badge-pill badge-info">${DogDateTime} </span>
        
                        <div class="contain cont">
                            ${MkdownCont}
                        </div>
        
                    </div>
                    <div class="card-footer">
                        <span class="uadog"> 
                        ${eledog.ua}</span>
                    </div>
                </div>`
                }
            }

        }
}