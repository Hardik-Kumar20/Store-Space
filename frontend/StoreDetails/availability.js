window.addEventListener("DOMContentLoaded" , ()=>{
    // const form = document.getElementById("form");
    // submit.addEventListener("submit" , async (e)=>{
    //     e.preventDefault();

    //     const formData = {
    //         availableFrom : form.availableFrom.value,
    //         availableTill : form.availableTill.value,
    //         minimumBookingDuration : form.minimumBookingDuration.value,
    //         blackoutDates : form.blackoutDates.value
    //     }

    //     const res = await fetch("/" , {
    //         method : "POST",
    //         headers : {"Content-Type" : "application/json"},
    //         body : JSON.stringify(formData);
    //     })

    //     const result = res.json();
    //     console.log(result);
    // })



    // shifting to make a new dashboard of the host 
    const submit = document.getElementById("sub");
    submit.addEventListener("submit" , (e)=>{
        e.preventDefault();
        setTimeout(()=>{
            window.location.href = "/hostDashBoard/host.html"
        } , 500)
    })
})