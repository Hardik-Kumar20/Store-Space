window.addEventListener("DOMContentLoaded" , ()=>{
    document.getElementById("home").addEventListener("click" , ()=>{
        setTimeout(() => {
            window.location.href = "/mainPage/mainpage.html"
        }, 500);
    })
    
    document.getElementById("signUp").addEventListener("click" , ()=>{
        setTimeout(() => {
            window.location.href = "/Authentication/signUp/signup.html";
        })
    })
    

    document.getElementById("becomeHost").addEventListener("click" , ()=>{
        const token = localStorage.getItem("authToken")
        console.log(token);
        setTimeout(() => {
            if(token){
                window.location.href = "/StoreDetails/storeDetail.html"
            }else{
                window.location.href = "/Authentication/login/login.html"
            }
        } , 500)
    })
})