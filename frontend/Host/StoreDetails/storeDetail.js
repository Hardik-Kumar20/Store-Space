window.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("authToken");
    if(!token) {
        window.location.href = "/Authentication/login/login.html";
        return;
    }
      

    const sub = document.getElementById('detailsForm'); 

    sub.addEventListener('submit', async function(e) {
        e.preventDefault();

        const UserData = {
            name: sub.storeName.value,
            address: sub.Address.value,
            kindOf: sub.storeType.value,
            description: sub.description.value,
            area: {
                length: Number(sub.length.value),
                width: Number(sub.width.value),
                height: Number(sub.height.value),
                floor: sub.floorLevel.value,
                weight: Number(sub.weightCapacity.value)
            }
        };

        try {
            const res = await fetch('/listing/listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(UserData),
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    // Token invalid or expired log out
                    localStorage.removeItem("authToken");
                    window.location.href = "/Authentication/login/login.html";
                    return;
                }
            
                // Otherwise, show an error but don't log out
                const errData = await res.json();
                alert(errData.message || "Something went wrong");
                return;
            }

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                localStorage.setItem("listingId", data.listing._id);
                window.location.href = "/Host/StoreDetails/availability.html";
            } else {
                alert(data.message || "Error creating listing");
            }


            console.log("Respones Status:" , res.status);
        } catch (err) {
            console.error("Network error:", err);
            alert("Network error. Try again.");
        }
    });
});
