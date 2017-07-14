function checkLoginOrNot(userID){
    if(userID == "" && userID == null){
        sessionStorage.clear();
        window.location = "./index.html";
    }

}