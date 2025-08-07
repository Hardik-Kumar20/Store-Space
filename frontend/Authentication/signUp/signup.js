const { type } = require("os");
const { post } = require("../../../backend/Routers/loginIndex");
const { application } = require("express");
const { json } = require("body-parser");

window.addEventListener('DOMContentLoaded' , ()=>{

    // accepting the data 
    document.getElementById("form").addEventListener("submit" , async (e)=>{
        e.preventDefault();
        const data = {
            username : this.userName.value,
            email : this.userEmail.value,
            password : this.userPass.value
        }

        const res = await fetch("/signup/signup" , {
            method : post,
            header : {
                "Content - Type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const result = await res.json();
        console.log(result);
    })





    document.getElementById("login").addEventListener("click" , ()=>{
        setTimeout(()=>{
            window.location.href = "/Authentication/login/login.html";
        } , 500);
    })
})