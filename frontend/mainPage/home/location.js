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
            })
            suggestion.appendChild(li);
        });
       }
    })
})