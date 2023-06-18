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


const elSelectNative = document.getElementsByClassName("js-selectNative")[0];
const elSelectCustom = document.getElementsByClassName("js-selectCustom")[0];
const elSelectCustomBox = elSelectCustom.children[0];
const elSelectCustomOpts = elSelectCustom.children[1];
const customOptsList = Array.from(elSelectCustomOpts.children);
const optionsCount = customOptsList.length;
const defaultLabel = elSelectCustomBox.getAttribute("data-value");

let optionChecked = "";
let optionHoveredIndex = -1;

elSelectCustomBox.addEventListener("click", (e) => {
  const isClosed = !elSelectCustom.classList.contains("isActive");

  if (isClosed) {
    openSelectCustom();
  } else {
    closeSelectCustom();
  }
});

function openSelectCustom() {
  elSelectCustom.classList.add("isActive");
  elSelectCustom.setAttribute("aria-hidden", false);

  if (optionChecked) {
    const optionCheckedIndex = customOptsList.findIndex(
      (el) => el.getAttribute("data-value") === optionChecked
    );
    updateCustomSelectHovered(optionCheckedIndex);
  }

  document.addEventListener("click", watchClickOutside);
  document.addEventListener("keydown", supportKeyboardNavigation);
}

function closeSelectCustom() {
  elSelectCustom.classList.remove("isActive");

  elSelectCustom.setAttribute("aria-hidden", true);

  updateCustomSelectHovered(-1);

  document.removeEventListener("click", watchClickOutside);
  document.removeEventListener("keydown", supportKeyboardNavigation);
}

function updateCustomSelectHovered(newIndex) {
  const prevOption = elSelectCustomOpts.children[optionHoveredIndex];
  const option = elSelectCustomOpts.children[newIndex];

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

  const elPrevOption = elSelectCustomOpts.querySelector(
    `[data-value="${prevValue}"`
  );
  const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);

  if (elPrevOption) {
    elPrevOption.classList.remove("isActive");
  }

  if (elOption) {
    elOption.classList.add("isActive");
  }

  elSelectCustomBox.textContent = text;
  optionChecked = value;
}

function watchClickOutside(e) {
  const didClickedOutside = !elSelectCustom.contains(event.target);
  if (didClickedOutside) {
    closeSelectCustom();
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

    const option = elSelectCustomOpts.children[optionHoveredIndex];
    const value = option && option.getAttribute("data-value");

    if (value) {
      elSelectNative.value = value;
      updateCustomSelectChecked(value, option.textContent);
    }
    closeSelectCustom();
  }

  if (event.keyCode === 27) {
    closeSelectCustom();
  }
}

elSelectNative.addEventListener("change", (e) => {
  const value = e.target.value;
  const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(
    `[data-value="${value}"]`
  )[0];

  updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
});

customOptsList.forEach(function (elOption, index) {
  elOption.addEventListener("click", (e) => {
    const value = e.target.getAttribute("data-value");

    elSelectNative.value = value;
    updateCustomSelectChecked(value, e.target.textContent);
    closeSelectCustom();
  });

  elOption.addEventListener("mouseenter", (e) => {
    updateCustomSelectHovered(index);
  });

});
