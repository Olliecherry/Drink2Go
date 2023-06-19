const navMain = document.querySelector('.nav__list');
const navToggle = document.querySelector('.header__toggle');
const navToggleNoJs = document.querySelector('.header__toggle--nojs');

navToggle.classList.remove('header__toggle--nojs');
navMain.classList.add('nav__list--closed');
navMain.classList.remove('nav__list--opened');
navMain.classList.remove('nav__list--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('nav__list--closed')) {
    navMain.classList.remove('nav__list--closed');
    navMain.classList.add('nav__list--opened');
    navToggle.classList.add('header__toggle--close');
  } else {
    navMain.classList.add('nav__list--closed');
    navMain.classList.remove('nav__list--opened');
    navToggle.classList.remove('header__toggle--close');
  }
});

const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

var map = L.map('map').setView([59.968318, 30.317224], 17.61);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var myIcon = L.icon({
  iconUrl: 'img/images-map/marker-map.svg',
  iconSize: [38, 50],
  iconAnchor: [19, 50],
  // popupAnchor: [-3, -76],
});


L.marker([59.968318, 30.317224], {icon: myIcon}).addTo(map);


const elselect__native = document.getElementsByClassName("select__native-js")[0];
const elselect__custom = document.getElementsByClassName("select__custom-js")[0];
const elselect__customBox = elselect__custom.children[0];
const elselect__customOpts = elselect__custom.children[1];
const customOptsList = Array.from(elselect__customOpts.children);
const optionsCount = customOptsList.length;
const defaultLabel = elselect__customBox.getAttribute("data-value");

let optionChecked = "";
let optionHoveredIndex = -1;

elselect__customBox.addEventListener("click", (e) => {
  const isClosed = !elselect__custom.classList.contains("isActive");

  if (isClosed) {
    openselect__custom();
  } else {
    closeselect__custom();
  }
});

function openselect__custom() {
  elselect__custom.classList.add("isActive");
  elselect__custom.setAttribute("aria-hidden", false);

  if (optionChecked) {
    const optionCheckedIndex = customOptsList.findIndex(
      (el) => el.getAttribute("data-value") === optionChecked
    );
    updateCustomSelectHovered(optionCheckedIndex);
  }

  document.addEventListener("click", watchClickOutside);
  document.addEventListener("keydown", supportKeyboardNavigation);
}

function closeselect__custom() {
  elselect__custom.classList.remove("isActive");

  elselect__custom.setAttribute("aria-hidden", true);

  updateCustomSelectHovered(-1);

  document.removeEventListener("click", watchClickOutside);
  document.removeEventListener("keydown", supportKeyboardNavigation);
}

function updateCustomSelectHovered(newIndex) {
  const prevOption = elselect__customOpts.children[optionHoveredIndex];
  const option = elselect__customOpts.children[newIndex];

  if (prevOption) {
    prevOption.classList.remove("isHover");
  }
  if (option) {
    option.classList.add("isHover");
  }

  optionHoveredIndex = newIndex;
}

function updateCustomSelectChecked(value, text) {
  const prevValue = optionChecked;

  const elPrevOption = elselect__customOpts.querySelector(
    `[data-value="${prevValue}"`
  );
  const elOption = elselect__customOpts.querySelector(`[data-value="${value}"`);

  if (elPrevOption) {
    elPrevOption.classList.remove("isActive");
  }

  if (elOption) {
    elOption.classList.add("isActive");
  }

  elselect__customBox.textContent = text;
  optionChecked = value;
}

function watchClickOutside(e) {
  const didClickedOutside = !elselect__custom.contains(event.target);
  if (didClickedOutside) {
    closeselect__custom();
  }
}

function supportKeyboardNavigation(e) {
  if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
    let index = optionHoveredIndex;
    e.preventDefault();
    updateCustomSelectHovered(optionHoveredIndex + 1);
  }

  if (event.keyCode === 38 && optionHoveredIndex > 0) {
    e.preventDefault();
    updateCustomSelectHovered(optionHoveredIndex - 1);
  }

  if (event.keyCode === 13 || event.keyCode === 32) {
    e.preventDefault();

    const option = elselect__customOpts.children[optionHoveredIndex];
    const value = option && option.getAttribute("data-value");

    if (value) {
      elselect__native.value = value;
      updateCustomSelectChecked(value, option.textContent);
    }
    closeselect__custom();
  }

  if (event.keyCode === 27) {
    closeselect__custom();
  }
}

elselect__native.addEventListener("change", (e) => {
  const value = e.target.value;
  const elRespectiveCustomOption = elselect__customOpts.querySelectorAll(
    `[data-value="${value}"]`
  )[0];

  updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
});

customOptsList.forEach(function (elOption, index) {
  elOption.addEventListener("click", (e) => {
    const value = e.target.getAttribute("data-value");

    elselect__native.value = value;
    updateCustomSelectChecked(value, e.target.textContent);
    closeselect__custom();
  });

  elOption.addEventListener("mouseenter", (e) => {
    updateCustomSelectHovered(index);
  });

});
