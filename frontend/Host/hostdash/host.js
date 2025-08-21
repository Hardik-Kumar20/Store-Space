// fetching data about the host from backend and then changing the dashboard according to the values provided by backend 
window.addEventListener("DOMContentLoaded" , ()=>{
    async function loadBookings() {
        try {
            const res = await fetch("");
            const bookings = await res.json();

            const bookingList = document.getElementById("booking-list");
            bookingList.innerHTML = ""; //clearing the default data

            bookings.forEach(e => {
                const row = document.createElement("tr");
                row.innerHTML = 
                `<td>${e.guest}</td>`
                `<td>${e.space}</td>`
                `<td>${new Date(e.date).toLocaleDateString}</td>`
                `<td><span class="status ${e.guest.toLowerCase()}">${e.guest}</span></td>`
                bookingList.appendChild(row);
            });
        } catch (error) {
            console.log("Error Loading Bookings: ", error);
        }
    }
    document.addEventListener("DOMContentLoaded" , loadBookings);
})
  