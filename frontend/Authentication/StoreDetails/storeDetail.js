document.getElementById('login').addEventListener('submit' ,async function log(e) {
    e.preventDefault();

    const UserData = {
        userName : this.userName.value,
        userPass : this.userPass.value
    }

    const res = await fetch('/path of backen' ,{
        method : 'Post',
        header : {
            'Content - Type' : 'application/json'
        },
        body : JSON.stringify(UserData)
    } )

    const data = await res.json();
    console.log(data);
})