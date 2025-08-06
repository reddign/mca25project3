var numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var lowerCaseList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCaseList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var approvedPass = false;
var approvedEmail = false;

function login(event){
    event.preventDefault();
    loginForm = document.getElementById("login");
    var username = loginForm.elements["user"].value;
    var password = loginForm.elements["password"].value;
    var email = loginForm.elements["email"].value;
    
    
    if (username == "" || password == "" || email == ""){
        alert("Please fill in all of the required fields.");
    }else{
        checkPassword(password);
        checkEmail(email);
        checkRegistration(approvedEmail, approvedPass);
    }
}

function checkPassword(password){
    if (password.length >= 8){
        for (let i=0; i<numberList.length; i++){
            if (password.includes(numberList[i])){
                for (let j=0; j<lowerCaseList.length; j++){
                    if (password.includes(lowerCaseList[j])){
                        for (let k=0; k<upperCaseList.length; k++){
                            if (password.includes(upperCaseList[k])){
                                approvedPass = true;
                            }
                        }
                    }
                }
            }
        }
    }else{
        approvedPass = false;
    }
}

function checkEmail(email){
    if (email.includes("@") && email.includes(".") && email.length >= 9){
        approvedEmail = true;
    }else{
        approvedEmail = false;
    }
}


function checkRegistration(approvedEmail, approvedPass){
    if (approvedEmail == true && approvedPass == true){
            loginForm.submit();
        }else{
            alert("Please choose a stronger password or email.");
        }
}