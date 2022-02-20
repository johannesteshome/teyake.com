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

let allExams = [];
let allTeachers = [];
let allStudents = [];


//SETTING SOME DEFAULT VALUES FOR LOCALSTORAGE
if(!!localStorage.getItem("exams")){
    allExams = JSON.parse(localStorage.getItem("exams"))
}
else{
    localStorage.setItem("exams", "[{\"name\":\"The New Test\",\"questions\":[[\"What is one of the big differences between traditional media and social media?\",\"participatory production\",\"social media reaches only a few people at a time\",\"the management structure of the companies\",\"traditional media offers no way for audiences to communicate with media producers\",null,2],[\"Which of the following is NOT a fundamental area of change regarding people's media habits?\",\"conversation\",\"collaboration\",\"choice\",\"communication\",\"curation\",3],[\"An important lesson learned in online political campaigns in recent years and other collaborative efforts that had online components is...\",\"people much prefer to do their own thing and not work in groups\",\"there is always a couple people who disrupt the work of others in the group\",\"people need to be able to meet face to face at times as well as online\",\"social media has still not lived up to its promise of helping people collaborate\",null,4],[\"A portable chunk of code that can be embedded in Web pages to give extra functionality is known as a\",\"folksonomy\",\"widget\",\"curator\",\"wiki\",null,2],[\"Creating a website or group that looks like it originated from concerned grassroots efforts of citizens is known as\",\"lurking\",\"trolling\",\"phishing\",\"astroturfing\",\"puppeting\",3],[\"A website that lets anyone add, edit, or delete pages of content is called a forum\",\"True\",\"False\",null,null,null,1]],\"key\":903,\"teacherID\":1,\"date\":\"2/8/2022\",\"status\":\"open\"},{\"name\":\"General Knowledge\",\"questions\":[[\"In 1768, Captain James Cook set out to explore which ocean?\",\" Pacific Ocean\",\"Atlantic Ocean\",\"Indian Ocean\",\"Arctic Ocean\",null,1],[\"What is actually electricity?\",\"A flow of water\",\"A flow of air\",\"A flow of electrons\",\"A flow of atoms\",null,3],[\"Which of the following is not an international organisation?\",\"FIFA\",\"NATO\",\"ASEAN\",\"FBI\",null,4],[\"Which of the following disorders is the fear of being alone?\",\"Agoraphobia\",\"Aerophobia\",\"Acrophobia\",\"Arachnophobia\",null,1],[\"Which of the following is a song by the German heavy metal band “Scorpions”?\",\"Stairway to Heaven\",\"Wind of Change\",\"Don’t Stop Me Now\",\"Hey Jude\",null,2],[\"What was the first country to use tanks in combat during World War I?\",\"France\",\"Japan\",\"Britain\",\"Germany\",null,3],[\"Goulash is a type of beef soup in Hungary\",\"True\",\"False\",null,null,null,1]],\"key\":5067,\"teacherID\":1,\"date\":\"1/8/2022\",\"status\":\"open\"}]")
}

if(!!localStorage.getItem("teachers")){
    allTeachers = JSON.parse(localStorage.getItem("teachers"))
}else{
    localStorage.setItem("teachers", "[{\"username\":\"yohannes\",\"password\":\"yohannes\",\"name\":\"Yohannes Assefa\",\"phone\":\"0909090909\",\"email\":\"mail@mail.com\",\"institution\":\"AASTU\",\"id\":1,\"exams\":[\"ucsLp\",\"5067\",\"ydb7n\",\"t7IYG\",\"mMtI1\",\"P3KOw\",\"kagWd\"]},{\"username\":\"kida\",\"password\":\"kida\",\"name\":\"Kidus Girma\",\"phone\":\"0909090909\",\"email\":\"kida@mail.com\",\"institution\":\"AASTU\",\"id\":2,\"exams\":[\"dv9Hb\",\"903\",\"XcKmf\"]},{\"username\":\"gragn\",\"password\":\"gragn\",\"name\":\"Yohannes Mesganaw\",\"phone\":\"0909090909\",\"email\":\"mail@mail.com\",\"institution\":\"AASTU\",\"id\":3,\"exams\":[]}]")
}

if(!!localStorage.getItem("students")){
    allStudents = localStorage.getItem("students")
}else{
    localStorage.setItem("students", "[{\"name\":\"Fantish\",\"id\":\"123\",\"email\":\"fantish@mail.com\",\"examkey\":\"5067\",\"answers\":[1,2,3,1,4,1,1],\"marked\":[1,0,0,1,0,0,1]},{\"name\":\"Bayu\",\"id\":\"1234\",\"email\":\"bayu@mail.com\",\"examkey\":\"5067\",\"answers\":[1,3,4,1,4,4,2],\"marked\":[1,1,1,1,0,0,0]},{\"name\":\"Kida\",\"id\":\"12345\",\"email\":\"kida@mail.com\",\"examkey\":\"903\",\"answers\":[1,4,2,1,3,1],\"marked\":[0,0,0,0,1,1]},{\"name\":\"abe\",\"id\":\"123456\",\"email\":\"abe@mail.com\",\"examkey\":\"903\",\"answers\":[3,4,2,3,3,2],\"marked\":[0,0,0,0,1,0]},{\"name\":\"Gragn\",\"id\":\"123\",\"email\":\"gragn@mail.com\",\"examkey\":\"903\",\"answers\":[1,5,0,4,0,2],\"marked\":[0,0,0,0,0,0]}]")
}