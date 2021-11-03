APIurl="";

Nowpath=window.location.pathname;

console.log(Nowpath);
shu=Nowpath.split("/");

if (shu[2]=="u") {
    showUserPage();
} else 

{
    
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
    default:
        showMainPage();
        break;
}

