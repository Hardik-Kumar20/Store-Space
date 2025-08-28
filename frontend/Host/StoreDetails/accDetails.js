const form = document.getElementById("hostForm");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const storeName = document.getElementById("storeName").value;
  const location = document.getElementById("location").value;
  const availability = document.getElementById("availability").value;
  const images = Array.from(document.getElementById("images").files).map(file => file.name); // just filenames
  const accountHolder = document.getElementById("accountHolder").value;
  const accountNumber = document.getElementById("accountNumber").value;
  const ifsc = document.getElementById("ifsc").value;

  const userId = localStorage.getItem("userId"); // assume saved on login

  try {
    const res = await fetch("/api/become-host", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        storeName,
        location,
        availability,
        images,
        accountDetails: { accountHolder, accountNumber, ifsc }
      })
    });

    const data = await res.json();
    if (res.ok) {
      messageDiv.textContent = "Host details saved successfully!";
      form.reset();
    } else {
      messageDiv.style.color = "red";
      messageDiv.textContent = data.error || "Something went wrong.";
    }
  } catch (err) {
    messageDiv.style.color = "red";
    messageDiv.textContent = "Server error. Try again.";
    console.error(err);
  }
});
