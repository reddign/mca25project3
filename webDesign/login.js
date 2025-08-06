function login(event){
    event.preventDefault();
    loginForm = document.getElementById("login");
    var username = loginForm.elements["user"].value;
    var password = loginForm.elements["password"].value;

    if (username == "" || password == ""){
        alert("You need to enter both username and password");
    }else{
        loginForm.submit();
        // alert(`Go away, ${username}! You are not a valid user.`);
    }
}