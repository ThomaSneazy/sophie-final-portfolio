document.querySelectorAll('.open-modal').forEach(function (modalOpener) {
  modalOpener.addEventListener('click', function () {
    let popup = modalOpener.getAttribute('data-modal');

    if (document.querySelector(`#${popup}`)) {
      document.querySelector(`#${popup}`).classList.remove('hide-modal');
    } else {
      alert("Non disponible pour le moment");
    }
  });
});

document.querySelector('#goToAddView').addEventListener('click', function () {
  document.querySelector('#galleryPhoto').classList.add('hide-article');
  document.querySelector('#addPhoto').classList.remove('hide-article');
});

document.querySelector('#return-to-projects').addEventListener('click', function () {
  document.querySelector('#galleryPhoto').classList.remove('hide-article');
  document.querySelector('#addPhoto').classList.add('hide-article');
});

document.querySelectorAll('.js-modal-close').forEach(function (item) {
  item.addEventListener('click', function () {
    item.closest('.modal').classList.add("hide-modal");
  });
});

document.querySelectorAll('.modal').forEach(function (modal) {
  modal.addEventListener('click', function (event) {
    modal.closest('.modal').classList.add("hide-modal");
  });
});

document.querySelectorAll('.modal-wrapper').forEach(function (wrapper) {
  wrapper.addEventListener('click', function (event) {
    event.stopPropagation();
  });
});
