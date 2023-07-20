fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(projects => {
    const gallery = document.querySelector('#room');
    const modalgallery = document.getElementById('modalroom');

    projects.forEach(project => {
      gallery.innerHTML += `
        <figure class="project-item" data-cat="${project.categoryId}" data-id="${project.id}">
          <img src="${project.imageUrl}" crossorigin="anonymous" alt="${project.title}">
          <figcaption>${project.title}</figcaption>
        </figure>
      `;

      if (token && userId) {
        modalgallery.innerHTML += `
          <figure class="project-item" data-cat="${project.categoryId}" id="${project.id}">
            <div class="action-options">
              <button class="action-item hover-action-item"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
              <button class="action-item delete-item" data-id="${project.id}"><i class="fa-regular fa-trash-can"></i></button>
            </div>
            <img class="imggallery" src="${project.imageUrl}" crossorigin="anonymous" alt="${project.title}" />
            <figcaption>éditer</figcaption>
          </figure>
        `;
      }
    });

    document.querySelectorAll('.delete-item').forEach(deleteButton => {
      deleteButton.addEventListener('click', () => {
        let idProject = deleteButton.getAttribute('data-id');
        showConfirmationDialog(idProject);
      });
    });
  });

document.querySelector('#addbutton').addEventListener('click', (e) => {
  const formData = new FormData();
  const image = document.querySelector('input[type="file"]').files[0];
  const title = document.querySelector('input[name="title"]').value;
  const category = document.querySelector('#popup-add-category').value;

  if (!validateFileType(image)) {
    showAddErrorMessage('Veuillez sélectionner un fichier au format .jpg ou .png');
    return;
  }

  if (!validateFileSize(image)) {
    showAddErrorMessage('La taille du fichier ne doit pas dépasser 4 Mo');
    return;
  }

  formData.append('image', image);
  formData.append('title', title);
  formData.append('category', category);

  if (title === '' || category === '0') {
    showAddErrorMessage('Veuillez compléter correctement les champs demandés');
  } else {
    addProject(formData);
  }
});

document.querySelector('#addWorkForm').addEventListener('submit', (e) => e.preventDefault());

document.querySelectorAll('#addWorkForm input').forEach(item => {
  item.addEventListener('change', () => validateAddForm());
});
document.querySelector('#addWorkForm select').addEventListener('change', () => validateAddForm());

function validateAddForm() {
  const image = document.querySelector('input[type="file"]').files[0];
  const title = document.querySelector('input[name="title"]').value;
  const category = document.querySelector('#popup-add-category').value;

  if (image !== 'undefined' && title !== '' && category !== '0') {
    document.querySelector('#addbutton').classList.add('validateAddButton');
  } else {
    document.querySelector('#addbutton').classList.remove('validateAddButton');
  }
}

function deleteProject(idProject) {
  fetch(`http://localhost:5678/api/works/${idProject}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.status === 200) {
        document.getElementById(idProject).remove();
      } else {
        showErrorMessage('Erreur lors de la suppression du projet');
      }
    });
}

function addProject(formData) {
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
    .then(response => {
      if (response.status === 201) {
        location.reload();
      } else {
        showErrorMessage('Erreur lors de l\'ajout du projet');
      }
    });
}

function showErrorMessage(message) {
  const errorContainer = document.querySelector('.error-container');
  errorContainer.textContent = message;
  errorContainer.classList.add('show');

  setTimeout(() => {
    errorContainer.classList.remove('show');
  }, 3000);
}

function showAddErrorMessage(message) {
  const errorContainer = document.querySelector('.error-container');
  errorContainer.textContent = message;
  errorContainer.classList.add('show');
}

function showConfirmationDialog(idProject) {
  const confirmationDialog = document.querySelector('#confirmation-dialog');
  confirmationDialog.classList.add('show');

  const confirmDeleteButton = document.querySelector('#confirm-delete-button');
  const cancelDeleteButton = document.querySelector('#cancel-delete-button');

  confirmDeleteButton.addEventListener('click', () => {
    deleteProject(idProject);
    confirmationDialog.classList.remove('show');
  });

  cancelDeleteButton.addEventListener('click', () => {
    confirmationDialog.classList.remove('show');
  });
}

function validateFileType(file) {
  const allowedExtensions = ['.jpg', '.png'];
  const fileType = file.type;
  const fileExtension = `.${fileType.split('/')[1]}`;
  return allowedExtensions.includes(fileExtension);
}

function validateFileSize(file) {
  const maxSize = 4 * 1024 * 1024; // 4 Mo
  return file.size <= maxSize;
}
