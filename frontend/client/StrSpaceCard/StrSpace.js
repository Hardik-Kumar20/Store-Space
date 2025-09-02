window.addEventListener("DOMContentLoaded" , ()=>{

    // getting the data
    async function listingRepresentation(){
        const urlParams = new URLSearchParams(window.location.search);
        const storeId = urlParams.get("id");
        if(!storeId) return console.log("No store Id from the store cards page");

        try {
            const res = await fetch(`/listing/getlistings/${storeId}`);
            const store = await res.json();
    
            if (!store || store.error) {
                console.error("Error fetching store details:", store.error || "No store found");
                return;
            }
    
            // Update image
            document.querySelector(".store-image").src = store.imageUrl || "images/placeholder.jpg";
            document.querySelector(".store-image").alt = store.name;
    
            // Store Info
            const storeInfoBox = document.querySelectorAll(".card-box")[0];
            storeInfoBox.innerHTML = `
                <h3>📍 Store Information</h3>
                <p><strong>Name:</strong> ${store.name}</p>
                <p><strong>Address:</strong> ${store.address}</p>
                <p><strong>Type:</strong> ${store.kindOf}</p>
            `;
    
            // Description
            const descBox = document.querySelectorAll(".card-box")[1];
            descBox.innerHTML = `
                <h3>📝 Description</h3>
                <p>${store.description || "No description available."}</p>
            `;
    
            // Area Specs
            const specsBox = document.querySelectorAll(".card-box")[2];
            specsBox.innerHTML = `
                <h3>📐 Area Specifications</h3>
                <p><strong>Length:</strong> ${store.length || "N/A"} ft</p>
                <p><strong>Width:</strong> ${store.width || "N/A"} ft</p>
                <p><strong>Height:</strong> ${store.height || "N/A"} ft</p>
                <p><strong>Floor Level:</strong> ${store.floorLevel || "N/A"}</p>
                <p><strong>Weight Capacity:</strong> ${store.weightCapacity || "N/A"} kg</p>
            `;
    
            // Availability
            const availBox = document.querySelectorAll(".card-box")[3];
            availBox.innerHTML = `
                <h3>⏰ Availability</h3>
                <p><strong>From:</strong> ${store.availableFrom || "N/A"}</p>
                <p><strong>Till:</strong> ${store.availableTill || "N/A"}</p>
                <p><strong>Min Booking Duration:</strong> ${store.minBookingDuration || "N/A"}</p>
                <p><strong>Blackout Dates:</strong> ${store.blackoutDates?.join(", ") || "None"}</p>
            `;
        } catch (error) {
            console.error("Error loading store details:", error);
        }
        
    }
    listingRepresentation();
})