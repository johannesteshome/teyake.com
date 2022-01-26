"use strict";
let mobileNav = document.querySelector("header");
let deskNav = document.querySelector(".header");
window.onscroll = function () {
  if (
    document.body.scrollTop >= 50 ||
    document.documentElement.scrollTop >= 50
  ) {
    mobileNav.classList.add("bg-blue");
    mobileNav.classList.remove("transparent");
    console.log("scrolling");
    deskNav.classList.add("bg-blue");
    deskNav.classList.remove("transparent");
  } else {
    mobileNav.classList.add("transparent");
    mobileNav.classList.remove("bg-blue");
    deskNav.classList.add("transparent");
    deskNav.classList.remove("bg-blue");
  }
};

let menuBtn = document.querySelector(".menu-btn");
let menuCloseBtn = document.querySelector(".menu-close-btn");
let sideBar = document.querySelector(".sidebar");

let closeSidebar = function () {
  sideBar.style.width = "0%";
  sideBar.style.opacity = "0";
  menuBtn.style.display = "block";
  document.querySelector("body").classList.remove("overflow-hidden");
};

menuBtn.addEventListener("click", function () {
  sideBar.style.width = "100%";
  sideBar.style.opacity = "1";
  menuBtn.style.display = "none";
  document.querySelector("body").classList.add("overflow-hidden");
});
menuCloseBtn.addEventListener("click", closeSidebar);

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closeSidebar();
  }
});
let currentDate = new Date();
console.log(currentDate.getFullYear());

let year = document.getElementById("current-year");
year.innerHTML = currentDate.getFullYear();
