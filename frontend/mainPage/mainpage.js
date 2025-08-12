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
        const isLoggedin = 
        setTimeout(() => {
            window.location.href = "/StoreDetails/storeDetail.html"
        } , 500)
    })
})