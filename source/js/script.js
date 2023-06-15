const navMain = document.querySelector('.nav__list');
const navToggle = document.querySelector('.header__toggle');
const navToggleNoJs = document.querySelector('.header__toggle--nojs');

navToggle.classList.remove('header__toggle--nojs');
navMain.classList.add('nav__list--closed');
navMain.classList.remove('nav__list--opened');
navMain.classList.remove('nav__list--nojs');

navToggle.addEventListener('click', function () {
  navToggle.classList.add('active');
  if (navMain.classList.contains('nav__list--closed')) {
    navMain.classList.remove('nav__list--closed');
    navMain.classList.add('nav__list--opened');
  } else {
    navMain.classList.add('nav__list--closed');
    navMain.classList.remove('nav__list--opened');
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

