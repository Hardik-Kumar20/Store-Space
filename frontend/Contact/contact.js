window.addEventListener('DOMContentLoaded' , ()=>{
    const sub = document.getElementById('contactForm');

    sub.addEventListener('submit' , async (e)=>{
        e.preventDefault();

        const contactData = {
            name : sub.name.value,
            email : sub.email.value,
            message : sub.message.value
        }

        try {
            const res = await fetch('/contact/contact' , {
                method : "POST",
                headers : { "Content-Type" : "application/json"},
                body: JSON.stringify(contactData)
            });
    
            const result = await res.json();
            console.log(result);
        } catch (error) {
            console.log("Something wrong in cotact frontend: " , error);
        }
    })
})