const token = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : false;
const userId = localStorage.getItem("userId")
  ? localStorage.getItem("userId")
  : false;

document.addEventListener("DOMContentLoaded", () => {
  if (token && userId) {
    document.querySelectorAll(".admin").forEach((item) => {
      item.classList.remove("hide-admin");
    });
    document.querySelectorAll(".not-hide").forEach((item) => {
      item.classList.add("hide-admin");
    });
  } else {
    document.querySelectorAll(".admin").forEach((item) => {
      item.classList.add("hide-admin");
    });
    document.querySelectorAll(".not-hide").forEach((item) => {
      item.classList.remove("hide-admin");
    });
  }
});

document.querySelectorAll(".open-modal").forEach(function (modalOpener) {
  modalOpener.addEventListener("click", function () {
    let popup = modalOpener.getAttribute("data-modal");

    if (document.querySelector(`#${popup}`)) {
      document.querySelector(`#${popup}`).classList.remove("hide-modal");
    } else {
      alert("Fonctionnalité en cours de construction.");
    }
  });
});

document.querySelector("#goToAddView").addEventListener("click", function () {
  document.querySelector("#galleryPhoto").classList.add("hide-article");
  document.querySelector("#addPhoto").classList.remove("hide-article");
});

document
  .querySelector("#return-to-projects")
  .addEventListener("click", function () {
    document.querySelector("#galleryPhoto").classList.remove("hide-article");
    document.querySelector("#addPhoto").classList.add("hide-article");
  });

document.querySelectorAll(".js-modal-close").forEach(function (item) {
  item.addEventListener("click", function () {
    item.closest(".modal").classList.add("hide-modal");
  });
});

document.querySelectorAll(".modal").forEach(function (modal) {
  modal.addEventListener("click", function (event) {
    modal.closest(".modal").classList.add("hide-modal");
  });
});

document.querySelectorAll(".modal-wrapper").forEach(function (wrapper) {
  wrapper.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

const logout = document.querySelector("ul li:nth-child(4)");
logout.addEventListener("click", function () {
  localStorage.clear("access_token");
  localStorage.clear("userId");
  token === 0;
  userId === 0;
  document.querySelectorAll(".admin").forEach((item) => {
    item.classList.add("hide-admin");
  });
  document.querySelectorAll(".not-hide").forEach((item) => {
    item.classList.remove("hide-admin");
  });
});

let addImageInput = document.querySelector("#add-photo-input");
addImageInput.addEventListener("change", () => {
  const image = addImageInput.files[0];
  const imageUrl = URL.createObjectURL(image);

  document.querySelector(
    "#add-image-preview"
  ).innerHTML = `<img src="${imageUrl}" />`;
  document.querySelectorAll("span").forEach((item) => {
    item.hidden = true;
  });
});
