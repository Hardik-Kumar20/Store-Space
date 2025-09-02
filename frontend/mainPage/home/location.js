window.addEventListener("DOMContentLoaded" , () => {
    const suggestion = document.getElementById("suggestions")
    const location = document.getElementById("location")
    location.addEventListener("input" , async (e)=>{
        e.preventDefault();
        const query = location.value.trim();
        if(!query) return;
        
        const res = await fetch(`/mainpage/autocomplete/api?text=${encodeURIComponent(query)}`);
        const data = await res.json();

       if(data.results && data.results.length > 0){
        suggestion.innerHTML = "";
        data.results.forEach(place => {
            const li = document.createElement("li");
            li.textContent = place;
            li.addEventListener("mousedown" , ()=>{
                location.value = place;
                suggestion.innerHTML = "";
                fetchStores(place);
            })
            suggestion.appendChild(li);
        });
       }
    })



    // sending location to listing.js (backend)
    async function fetchStores(loc) {
        try {
            const res = await fetch(`/listing/stores?location=${encodeURIComponent(loc)}`);
            const result = await res.json();
            console.log(result, "Stores from backend");
            // here you can display cards like before
        } catch (error) {
            console.error("Error fetching stores:", error);
        }
    }
    
    

    })

