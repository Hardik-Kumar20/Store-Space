window.addEventListener("DOMContentLoaded" , ()=>{
    document.getElementById("home").addEventListener("click" , ()=>{
        setTimeout(() => {
            window.location.href = "/mainPage/home.html"
        }, 500);
    })
    
    document.getElementById("signUp").addEventListener("click" , ()=>{
        setTimeout(() => {
            window.location.href = "/Authentication/signUp/signup.html";
        }, 500)
    })
    
    document.getElementById("about").addEventListener("click" , ()=>{
        setTimeout(() => {
            window.location.href = "/mainPage/about/about.html";
        }, 500)
    })

    document.getElementById("becomeHost").addEventListener("click" , ()=>{
        const token = localStorage.getItem("authToken")
        console.log(token);
        setTimeout(() => {
            if(token){
                window.location.href = "/Host/StoreDetails/storeDetail.html"
            }else{
                window.location.href = "/Authentication/login/login.html"
            }
        } , 500)
    })

    document.getElementById("contact").addEventListener("click" , ()=>{
        setTimeout(() => {
            window.location.href = "/Contact/contact.html";
        }, 500)
    })





    // Now Saving the searchBar form data 
    const sub = document.getElementById("searchForm");
    sub.addEventListener("submit" , async (e)=>{
        e.preventDefault();
        try {
            const formData = {
                location : sub.location.value,
                checkin : sub.checkin.value,
                checkout : sub.checkout.value,
                size : sub.size.value
            }

            const res = await fetch("/mainpage/searchBar" , {
                method : "Post",
                headers : {"Content-Type" : "application/json"},
                body: JSON.stringify(formData)
            })

            const result = await res.json()
            console.log(result);

            if(res.ok){
                window.location.href = "/client/SearchResult/storeCards.html"
            }

        } catch (error) {
            console.log("Error in sedarchBar Frontend" , error);
        }
    })
})