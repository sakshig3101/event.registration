const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, phone })
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = data.message;
      message.style.color = "green";
      form.reset();
    } else {
      message.textContent = "Registration failed";
      message.style.color = "red";
    }

  } catch (error) {
    message.textContent = "Server error!";
    message.style.color = "red";
    console.error(error);
  }
});

