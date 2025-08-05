const { json } = require("express");

document.getElementById("form").addEventListener('submit' , async function (e){
e.preventDefault();

const formData = {
    UserName : this.UserName.value,
    email : this.userEmail.value,
    password : this.userPass.value
}

const res = await fetch('/signup/signup' , {
    method : 'Post',
    headers : {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(formData)
})
const data = await res.json();
// alert(data);
console.log(data);

})