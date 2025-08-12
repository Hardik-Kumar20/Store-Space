window.addEventListener("DOMContentLoaded" , ()=>{
    const form = document.getElementById("signUpForm");
    form.addEventListener("submit" , (e)=>{
        e.preventDefault();
        setTimeout(()=>{
            window.location.href = "/StoreDetails/storeDetail.html";
        } , 500)
    })
})