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
        const res = await fetch("/listing/stores")
        const Stores = await res.json();
        container.innerHTML = "";
        Stores.forEach(store => {
            const card = document.createElement("div")
            card.classList.add("store-card");
            card.innerHTML = `
            <img src = "${store.imageUrl || 'images/placeholder.jpg'}" alt= "${store.storeName}" class = "StoreImage">
            <div class = "StoreInfo">
            <h3>${store.name}</h3>
            <p><strong>Address:</strong>${store.address}</p>
            <p><strong>Type:</strong>${store.kindOf}</p>
           <button class="view-btn" data-id="${store._id}">View Details</button>
            </div>
            `;
            container.appendChild(card);

            card.querySelector(".view-btn").addEventListener("click", (e) => {
                const storeId = e.target.dataset.id;
                console.log("This is the store if from storeCards.js", storeId)
                window.location.href = `/client/StrSpaceCard/StrSpace.html?id=${storeId}`;
            });
            
        });
    } catch (error) {
        console.error("Error loading store cards:", error);
    }
    }
    CardsDataLoad();

})