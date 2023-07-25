// BLOQUER LA SOUMISSION DU FORMULAIRE
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
});

// ECOUTER LE CLICK DU BOUTON
document.querySelector("#login-button").addEventListener("click", function () {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message || data.error) {
        document.querySelector("#error-message").textContent =
          "Erreur dans l`identifiant ou le mot de passe";
      } else {
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("userId", data.userId);
        window.location.href = "/FrontEnd/";
      }
    })
    .catch((error) => console.error(error));
});
