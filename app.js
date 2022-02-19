"use strict";
let mobileNav = document.querySelector("header");
let deskNav = document.querySelector(".header");

window.onscroll = function() {
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
const menuIcon = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path
    fill-rule="evenodd"
    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
    clip-rule="evenodd"
  /></svg
>`;

// <span class="menu-close-btn">
// </span>
const closeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
</svg>`;

const menuBtn = document.querySelector(".menu-btn");
// const menuCloseBtn = document.querySelector(".menu-close-btn");
const sideBar = document.querySelector(".sidebar");
const header = document.querySelector("header");

let sidebarOpen = false;

const openSidebar = function () {
  sideBar.style.transform = "translateX(0)";
  header.classList.remove("transparent");
  header.style.backgroundColor = "rgba(53, 50, 56,1)";
  document.querySelector("body").classList.add("overflow-hidden");
  sidebarOpen = true;
  menuBtn.innerHTML = closeIcon;
};
const closeSidebar = function () {
  sideBar.style.transform = "translateX(100%)";
  header.style.removeProperty("background-color");
  header.classList.add("transparent");
  document.querySelector("body").classList.remove("overflow-hidden");
  sidebarOpen = false;
  menuBtn.innerHTML = menuIcon;
};

menuBtn.addEventListener("click", function() {
    sidebarOpen ? closeSidebar() : openSidebar();
});

document.addEventListener("keydown", function(evt) {
    if (evt.key === "Escape") {
        closeSidebar();
    }
});

const enterSidebarBtn = document.querySelector("#enter-exam-sidebar-btn");
const enterHeadBtn = document.querySelector("#enter-exam-head-btn");
const enterIntroBtn = document.querySelector("#enter-exam-intro-btn");

const enterSidebarField = document.querySelector("#exam-key-sidebar");
const enterIntroField = document.querySelector("#exam-key-intro");
const enterHeadField = document.querySelector("#exam-key-header");

let studKey = "-1";

enterSidebarBtn.addEventListener("click", function(evt) {
    evt.preventDefault();
    if (enterSidebarField.value == "") {
        alert("enter a key");
        return;
    }
    studKey = enterSidebarField.value;
    console.log(studKey);
    localStorage.setItem("studKey", studKey);

    window.open("takeexam/takeexam.html", "_parent");
});
enterHeadBtn.addEventListener("click", function(evt) {
    evt.preventDefault();
    if (enterHeadField.value == "") {
        alert("enter a key");
        return;
    }
    studKey = enterHeadField.value;
    localStorage.setItem("studKey", studKey);
    console.log(studKey);
    window.open("takeexam/takeexam.html", "_parent");
});
enterIntroBtn.addEventListener("click", function(evt) {
    evt.preventDefault();
    if (enterIntroField.value == "") {
        alert("enter a key");
        return;
    }
    studKey = enterIntroField.value;
    localStorage.setItem("studKey", studKey);
    console.log(studKey);
    window.open("takeexam/takeexam.html", "_parent");
});

const subjects = [{
        subject: "Physics",
        teacher: "Abebe Kebede",
        school: "Addis Ababa Science and technology university",
        text: "Exam.net has been the best COVID friendly resource i have used all year. My students were able to take tests at home, in person and fully online; I wasn't warried about cheating because of the security features provided by the system. I used it mosrly with middle school students and they used it mostly with middle school students and they used it with ease. It was also easy to create the tests as i could not use paper as i have done in the past. Before i found Teyake.com i used sites that were just not as effective or user friendly. Nothing compares to this.",
    },
    {
        subject: "Chemistry",
        teacher: "Kebebush Kebede",
        school: "Addis Ababa Science and technology university",
        text: "Exam.net has been the best COVID friendly resource i have used all year. My students were able to take tests at home, in person and fully online; I wasn't warried about cheating because of the security features provided by the system. I used it mosrly with middle school students and they used it mostly with middle school students and they used it with ease. It was also easy to create the tests as i could not use paper as i have done in the past. Before i found Teyake.com i used sites that were just not as effective or user friendly. Nothing compares to this.",
    },
    {
        subject: "History",
        teacher: "Debebe Kebede",
        school: "Addis Ababa Science and technology university",
        text: "Exam.net has been the best COVID friendly resource i have used all year. My students were able to take tests at home, in person and fully online; I wasn't warried about cheating because of the security features provided by the system. I used it mosrly with middle school students and they used it mostly with middle school students and they used it with ease. It was also easy to create the tests as i could not use paper as i have done in the past. Before i found Teyake.com i used sites that were just not as effective or user friendly. Nothing compares to this.",
    },
    {
        subject: "Biology",
        teacher: "Yohannes Assefa",
        school: "Addis Ababa Science and technology university",
        text: "Exam.net has been the best COVID friendly resource i have used all year. My students were able to take tests at home, in person and fully online; I wasn't warried about cheating because of the security features provided by the system. I used it mosrly with middle school students and they used it mostly with middle school students and they used it with ease. It was also easy to create the tests as i could not use paper as i have done in the past. Before i found Teyake.com i used sites that were just not as effective or user friendly. Nothing compares to this.",
    },
    {
        subject: "English",
        teacher: "Yohannes Fantahun",
        school: "Addis Ababa Science and technology university",
        text: "Exam.net has been the best COVID friendly resource i have used all year. My students were able to take tests at home, in person and fully online; I wasn't warried about cheating because of the security features provided by the system. I used it mosrly with middle school students and they used it mostly with middle school students and they used it with ease. It was also easy to create the tests as i could not use paper as i have done in the past. Before i found Teyake.com i used sites that were just not as effective or user friendly. Nothing compares to this.",
    },
    {
        subject: "Math",
        teacher: "Yohannes Mesganaw",
        school: "Addis Ababa Science and technology university",
        text: "Exam.net has been the best COVID friendly resource i have used all year. My students were able to take tests at home, in person and fully online; I wasn't warried about cheating because of the security features provided by the system. I used it mosrly with middle school students and they used it mostly with middle school students and they used it with ease. It was also easy to create the tests as i could not use paper as i have done in the past. Before i found Teyake.com i used sites that were just not as effective or user friendly. Nothing compares to this.",
    },
];

subjects.forEach((subject) => {
    let el = document.createElement("button");
    el.setAttribute("type", "button");
    el.classList.add("subject-btn");
    el.textContent = subject.subject;
    document.querySelector(".subject-choice").append(el);

    el.addEventListener("click", function() {
        document.querySelectorAll(".subject-btn").forEach((subject) => {
            subject.classList.remove("subject-active");
        });
        el.classList.add("subject-active");
        document.querySelector("#subject-name").textContent = el.textContent;

        document.querySelector("#teacher-name").textContent = subject.teacher;
        document.querySelector("#school-name").textContent = subject.school;
        document.querySelector("#subject-text").textContent = subject.text;
    });
});

const firstEl = document.querySelector(".subject-choice").childNodes[0];
firstEl.classList.add("subject-active");
document.querySelector("#teacher-name").textContent = subjects[0].teacher;
document.querySelector("#school-name").textContent = subjects[0].school;
document.querySelector("#subject-text").textContent = subjects[0].text;

let currentDate = new Date();
console.log(currentDate.getFullYear());

let year = document.getElementById("current-year");
year.innerHTML = currentDate.getFullYear();