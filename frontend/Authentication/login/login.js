window.addEventListener('DOMContentLoaded' , ()=>{
    // accepting the data to send to the backend
    const login = document.getElementById("login");
    login.addEventListener("submit" , async (e)=>{
        e.preventDefault();

        try {
            const formData =  {
                userName : login.userName.value,
                password : login.userPass.value
            }
    
            const res = await fetch("/login/login" , {
                method : "Post",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(formData)
            })
    
            const result = await res.json();
            console.log(result);
    
            if(res.ok){
                if(result.token){
                    localStorage.setItem("authToken" , result.token)
                }
                window.location.href = "/mainPage/mainpage.html"
            }
            else{
                alert("Login failed")
            }
        } catch (error) {
            console.log("Error in login the user : " , error);
        }
    })


// shifting to signup page 
    document.getElementById("signup").addEventListener("click" , ()=>{
        setTimeout(()=>{
            window.location.href = "/Authentication/signUp/signup.html"
        } , 500)
    })
})