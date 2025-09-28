document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("authToken");
    const listingId = localStorage.getItem("listingId"); // store this after creating the listing
  
    if (!token) {
      window.location.href = "/Authentication/login/login.html";
      return;
  }
    if (!listingId) {
      alert("No store found. Please create a store first.");
      window.location.href = "/Host/StoreDetails/storeDetails.html";
      return;
  }
    console.log("Current store ID:", listingId);

    const data = {
      listing : listingId,
      availableFrom: document.getElementById("availableFrom").value,
      availableTill: document.getElementById("availableTill").value,
      minimumBookingDuration: document.getElementById("duration").value,
      blackoutDates: document.getElementById("blackoutDates").value
    };

    const res = await fetch("/availability/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  
    const responseData = await res.json();
    console.log(responseData);
  
    if (res.ok) {
      alert("Availability added successfully!");
      window.location.href = "/Host/hostdash/host.html";
    }
  });
  