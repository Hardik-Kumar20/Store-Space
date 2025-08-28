window.addEventListener("DOMContentLoaded" , (e)=>{
   
    async function loadResultDetails() {
       const locnHead = document.getElementById('searchedLocation');
        const res = await fetch("/mainpage/resultPage");
        const data = await res.json();
        console.log(data, "This is the data from result.js")
        if (data && data.location) {
            locnHead.textContent = data.location;
        } else {
            locnHead.textContent = "No location found";
            console.log("There is an error in frontend: no location received.");
        }
    }
    loadResultDetails();
})