window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            userName: form.userName.value,    // match your input name attributes exactly
            userEmail: form.userEmail.value,
            userPass: form.userPass.value
        };

        try {
            const res = await fetch("/signup/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            console.log(result);

            // Optional: show success message or redirect user
        } catch (error) {
            console.error("Error submitting signup form:", error);
        }
    });

    document.getElementById("login").addEventListener("click", () => {
        setTimeout(() => {
            window.location.href = "/Authentication/login/login.html";
        }, 500);
    });

    document.getElementById("host").addEventListener("click", () => {
        setTimeout(() => {
            window.location.href = "/Authentication/login/login.html";
        }, 500);
    });
});
