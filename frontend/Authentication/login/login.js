window.addEventListener('DOMContentLoaded' , ()=>{



    // accepting the data to send to the backend
    document.getElementById("login").addEventListener("submit" , async (e)=>{
        e.preventDefault();

        const formData =  {
            userName : this.userName.value,
            pass : this.userPass.value
        }

        const res = await fetch("/login/login" , {
            method : Post,
        header : {"Content-Type" : "application/json"},
        body : JSON.stringify(formData)
        })

        const result = await res.json();
        console.log(result);
    })





    document.getElementById("signup").addEventListener("click" , ()=>{
        setTimeout(()=>{
            window.location.href = "/Authentication/signUp/signup.html"
        } , 500)
    })
})