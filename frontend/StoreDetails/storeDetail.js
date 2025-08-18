window.addEventListener("DOMContentLoaded", () => {

    // checking for token authorization
    const token = localStorage.getItem('authToken');

    if(!token){
        window.location.href = "/Authentication/signUp/signup.html"
    }


    const sub = document.getElementById('login'); 

    sub.addEventListener('submit', async function(e) {
        e.preventDefault();

        const UserData = {
            name: sub.storeName.value,
            address: sub.Address.value,
            kindOf: sub.storeType.value,
            description: sub.description.value, // fixed typo
            area: {
                length: Number(sub.length.value),
                width: Number(sub.width.value),
                height: Number(sub.height.value),
                floor: sub.floorLevel.value,
                weight: Number(sub.weightCapacity.value)
            }
        };

        try {
            const res = await fetch('/api/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(UserData)
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                // Redirect to availability page
                window.location.href = "/availability.html";
            } else {
                alert(data.message || "Error creating listing");
            }

        } catch (err) {
            console.error("Network error:", err);
            alert("Network error. Try again.");
        }
    });
});
