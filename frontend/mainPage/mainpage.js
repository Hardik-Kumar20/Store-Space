document.getElementById("home").addEventListener("click" , ()=>{
    setTimeout(() => {
        window.location.href = "/mainPage/mainpage.html"
    }, 500);
})


document.getElementById("login").addEventListener("click", () => {
    setTimeout(() => {
        window.location.href = "/Authentication/login/login.html";
    }, 500);
});

document.getElementById("signUp").addEventListener("click" , ()=>{
    setTimeout(() => {
        window.location.href = "/Authentication/signUp/signup.html";
    })
})

