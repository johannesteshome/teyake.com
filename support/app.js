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

const openSidebar = function() {
    sideBar.style.transform = "translateX(0)";
    // sideBar.style.opacity = "1";
    header.classList.remove("transparent");
    header.style.backgroundColor = "rgba(53, 50, 56,1)";
    document.querySelector("body").classList.add("overflow-hidden");
    sidebarOpen = true;
    menuBtn.innerHTML = closeIcon;
};
const closeSidebar = function() {
    sideBar.style.transform = "translateX(100%)";
    // sideBar.style.opacity = "0";
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

const subjects = [{
        subject: "Physics",
        teacher: "Etna Entn",
        school: "Addis Ababa Science and technology university",
        text: "Exam.net has been the best COVID friendly resource i have used all year. My students were able to take tests at home, in person and fully online; I wasn't warried about cheating because of the security features provided by the system. I used it mosrly with middle school students and they used it mostly with middle school students and they used it with ease. It was also easy to create the tests as i could not use paper as i have done in the past. Before i found Teyake.com i used sites that were just not as effective or user friendly. Nothing compares to this.",
    },
    {
        subject: "Chemistry",
        teacher: "Etna Entna entn",
        school: "Addis Ababa Science and technology university",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quibusdam praesentium placeat ipsa obcaecati esse dicta earum doloribus iste eaque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quaerat est vero fugit quis numquam fuga sequi! Unde magni quos ipsa repudiandae quae minima a sequi voluptate sit, fuga enim.",
    },
    {
        subject: "History",
        teacher: "Etna debebe kebede",
        school: "Addis Ababa Science and technology university",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat magnam doloremque saepe nulla repudiandae. Explicabo sit magnam autem laboriosam reiciendis, in nisi dignissimos consequatur excepturi praesentium nemo esse magni aut ducimus voluptate, perspiciatis temporibus corporis? Perspiciatis voluptas doloremque commodi consequatur, omnis impedit optio amet ex cupiditate similique nihil at quis!",
    },
    {
        subject: "Biology",
        teacher: "Etna Entn",
        school: "Addis Ababa Science and technology university",
        text: "Velit est cum aperiam dignissimos odio illo laboriosam porro deserunt numquam repudiandae animi, aut corrupti soluta repellat totam a? Blanditiis cupiditate veritatis debitis obcaecati ut perspiciatis at nesciunt adipisci iure magnam voluptates labore eos explicabo laudantium laboriosam a ea, corrupti harum. Fugiat eos nostrum vitae ullam? Atque, sit! Odio assumenda ducimus porro, voluptatum facere sit.",
    },
    {
        subject: "English",
        teacher: "Etna Entn",
        school: "Addis Ababa Science and technology university",
        text: "Error inventore harum dicta amet quis id quas aliquid quasi minus, iste maxime recusandae eaque assumenda molestias voluptatem modi quo consectetur delectus est veniam a deleniti voluptatum corrupti? Iste excepturi odit ullam quam animi aut commodi eum magnam sit iusto reprehenderit, quibusdam odio officiis totam corrupti ea libero doloremque in. Rem, error et? Beatae ratione saepe esse laboriosam illum officiis voluptatum. Ipsa, accusantium? Maxime quaerat, eveniet, omnis quam culpa nihil eligendi hic nobis magnam architecto delectus ad eaque sit saepe iste, suscipit officia accusantium quisquam in autem voluptatibus provident impedit! Delectus quidem obcaecati omnis aliquid alias hic laborum tenetur?",
    },
    {
        subject: "Math",
        teacher: "Etna Entn",
        school: "Addis Ababa Science and technology university",
        text: "Minima, earum nostrum mollitia dolores molestiae ratione? Eos quas maiores, nostrum culpa consequatur fugiat sit, sequi dolorum distinctio quae voluptate, non laborum beatae molestias. Est ullam aspernatur ratione nemo exercitationem, tenetur vero doloribus tempora deserunt. Ipsam, dolores! Recusandae tempore ut accusantium dolore maiores officiis non eveniet saepe iste asperiores fuga cumque eaque, possimus tempora veritatis quisquam, omnis cum laborum, dicta vel pariatur molestiae deserunt. Dignissimos labore obcaecati quod quas accusantium ut quos maiores, nostrum est tempore?",
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