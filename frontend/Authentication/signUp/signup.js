window.addEventListener('DOMContentLoaded' , ()=>{
    document.getElementById("login").addEventListener("click" , ()=>{
        setTimeout(()=>{
            window.location.href = "/Authentication/login/login.html";
        } , 500);
    })
})