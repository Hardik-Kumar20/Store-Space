window.addEventListener("DOMContentLoaded" , ()=>{
    const sub = document.getElementById('login'); 
    sub.addEventListener('submit' ,async function log(e) {
        e.preventDefault();
    
        const UserData = {
            name : sub.storeName.value,
            address : sub.Address.value,
            kindOf : sub.storeType.value,
            decription : sub.description.value,
            area : {
                length : sub.length.value,
                width : sub.width.value,
                height : sub.height.value,
                floor : sub.floorLevel.value,
                weight : sub.weightCapacity.value
            }
        }
    
        const res = await fetch('/lsisting/listing' ,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(UserData)
        } )
    
        const data = await res.json();
        console.log(data);
    })




    // going to availabilitty page
    const form = document.getElementById("detailsForm");
    form.addEventListener("submit" , ()=>{
        setTimeout(()=>{
            window.location.href = "/availability.html";
        })
    })
})