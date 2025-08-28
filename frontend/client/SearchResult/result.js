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


    async function CardsDataLoad() {
    const container = document.getElementById("results-container");
    try {
        const res = await fetch("/listing/listing")
        const Stores = await res.json();
        container.innerHTML = "";
        Stores.forEach(store => {
            const card = document.createElement("div")
            card.classList.add("store-card");
            card.innerHTML = `
            <img src = "${store.imageUrl || 'images/placeholder.jpg'}" alt= "${store.storeName}" class = "StoreImage">
            <div class = "StoreInfo">
            <h3>${store.storeName}</h3>
            <p><strong>Address:</strong>${store.address}</p>
            <p><strong>Type:</strong>${store.storeType}</p>
           <button class="view-btn" data-id="${store._id}">View Details</button>
            </div>
            `;
            container.appendChild(card);

            document.querySelectorAll(".view-btn").forEach(button => {
                button.addEventListener("click", (e) => {
                    const storeId = e.target.dataset.id;
                    window.location.href = `/client/storeDetails.html?id=${storeId}`;
                });
            });
            
        });
    } catch (error) {
        console.error("Error loading store cards:", error);
    }
    }
    CardsDataLoad();

})