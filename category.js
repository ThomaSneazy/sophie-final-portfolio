// category.js

fetch("http://localhost:5678/api/categories")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (choices) {
    choices.unshift({
      id: 0,
      name: "Tous",
    });

    choices.forEach(function (cat) {
      document.querySelector(
        "#popup-add-category"
      ).innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
    });

    const categories = document.getElementById("choices");

    choices.forEach((choice) => {
      let button = document.createElement("button");
      button.innerHTML = `${choice.name}`;
      button.setAttribute("data-cat", choice.id);
      choice.id === 0 && button.classList.add("cat-active");
      categories.appendChild(button);

      button.addEventListener("click", function () {
        document.querySelector(".cat-active").classList.remove("cat-active");
        button.classList.add("cat-active");
        let currentcategory = button.getAttribute("data-cat");
        let projects = document.querySelectorAll(".project-item");
        projects.forEach(function (item) {
          item.classList.remove("hide-work");
          if (
            item.getAttribute("data-cat") !== currentcategory &&
            currentcategory !== "0"
          ) {
            item.classList.add("hide-work");
          }
        });
      });
    });
  });
