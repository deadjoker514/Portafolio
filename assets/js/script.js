'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
// projects modal functionality
// Modal exclusivo para proyectos
const projectViewBtns = document.querySelectorAll('[data-project-view]');
const projectModalContainer = document.querySelector('.project-modal-container');
const projectModalCloseBtn = document.querySelector('.project-modal-close-btn');
const projectModalImg = document.querySelector('[data-project-modal-img]');
const projectModalTitle = document.querySelector('[data-project-modal-title]');
const projectModalText = document.querySelector('[data-project-modal-text]');

const openProjectModal = function () {
  projectModalContainer.classList.add('active');
};
const closeProjectModal = function () {
  projectModalContainer.classList.remove('active');
};

for (let i = 0; i < projectViewBtns.length; i++) {
  projectViewBtns[i].addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const projectItem = projectViewBtns[i].closest('.project-item');
    const img = projectItem.querySelector('img');
    const title = projectItem.querySelector('[data-project-title]');
    const description = projectItem.querySelector('[data-project-description]');

    projectModalImg.src = img.src;
    projectModalImg.alt = img.alt;
    projectModalTitle.innerHTML = title ? title.innerHTML : '';
    // Inserta la descripción dentro de un <p> con la clase correcta
    projectModalText.innerHTML = '';
    if (description) {
      const p = document.createElement('p');
      p.className = 'project-description';
      p.textContent = description.textContent;
      projectModalText.appendChild(p);
    }
    openProjectModal();
  });
}
if (projectModalCloseBtn) projectModalCloseBtn.addEventListener('click', closeProjectModal);
if (projectModalContainer) projectModalContainer.addEventListener('click', function(e) {
  if (e.target === projectModalContainer) closeProjectModal();
});
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.add("active");
  overlay.classList.add("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", function() {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
});
overlay.addEventListener("click", function() {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
});



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {
    const categories = filterItems[i].dataset.category.split(',').map(cat => cat.trim().toLowerCase());
    if (selectedValue === "todos" || selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (categories.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Mapeo de español a los valores de data-page
const pageMap = {
  "sobre mí": "about",
  "currículum": "resume",
  "proyectos": "portfolio",
  "blog": "blog",
  "contacto": "contact"
};

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageEs = this.getAttribute("data-page-es").toLowerCase();
    const pageName = pageMap[pageEs];
    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page === pageName) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}