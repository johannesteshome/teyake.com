("use strict");
import { Student, Exam, Teacher } from "../core.js";

let currentSignin = -1;
if(!!localStorage.getItem("current"));
currentSignin = localStorage.getItem("current");
// console.log(currentSignin);

if (currentSignin === -1 || currentSignin === 0) {
  alert("please login");
  console.log("not logged in");
}

let allExams = [];
if (!!localStorage.getItem("exams")) {
  allExams = JSON.parse(localStorage.getItem("exams"));
}
let totalExams = allExams.length;

let allStudents = [];
if (!!localStorage.getItem("students")) {
  allStudents = JSON.parse(localStorage.getItem("exams"));
}
let totalStudents = allStudents.length;

let allTeachers = [];
if(!!localStorage.getItem("teachers")){
  allTeachers = JSON.parse(localStorage.getItem("teachers"));
}
let currentTeacher = new Teacher();
for(let i=0;i<allTeachers.length;i++){
  if(allTeachers.length == 0)break;
  if(allTeachers[i].id == currentSignin){
    currentTeacher = allTeachers[i];
    break;
  }
}

let currentTeacherExams = allExams.filter((item) =>{
  return item.teacherID === Number(currentSignin);
})

currentTeacherExams.forEach(exam =>{
  let cont = document.createElement("div");
  cont.className = "exam-tile";
  cont.innerHTML = 
  `<p class="exam-name">${exam.name}</p>
  <p class="exam-key">${exam.key}</p>
  <p class="date-created">${exam.date}</p>
  <p class="status">${exam.status}</p>`;

  document.querySelector(".exam-tile-container").appendChild(cont);
})

/* <div class="exam-tile">
<p class="exam-name">Math Quiz</p>
<p class="exam-key">44353</p>
<p class="date-created">1/31/2022</p>
<p class="status">Open</p>
</div> */

console.log(currentTeacherExams);

const dashboardHome = document.querySelector(".dashboard-home");
const examListPage = document.querySelector(".exam-list");
const addExamContainer = document.querySelector(".add-exam-container");
const addExamPage = document.querySelector(".add-exam");
const writeExamPage = document.querySelector(".write-exam");
const examNameInput = document.querySelector("#add-exam-name");
const questionPrompt = document.querySelector("#question-prompt");
const links = document.querySelectorAll(".list-item");
const choiceList = document.querySelector(".choice-container");

window.onload = function () {
  document.querySelectorAll(".list-item")[0].click();
};

let pages = [dashboardHome, examListPage, addExamContainer];
// Page Structure
links.forEach((link, i) => {
  link.addEventListener("click", function () {
    links.forEach((el) => {
      el.classList.remove("active");
    });
    pages.forEach((page) => {
      page.classList.add("hidden");
    });
    pages[i].classList.remove("hidden");
    link.classList.add("active");
  });
});

document.querySelector("#add-btn").addEventListener("click", function(){
  pages.forEach((page) => {
    page.classList.add("hidden");
  });
  links.forEach((el) => {
    el.classList.remove("active");
  });
  pages[2].classList.remove("hidden");
  links[2].classList.add("active");
})

//INITIALIZING THE EXAM
let test = new Exam("");
document
  .querySelector("#proceed-to-write")
  .addEventListener("click", function (evt) {
    evt.preventDefault();
    if (examNameInput.value === "") {
      alert("Please fill out Exam Name field");
      return;
    }
    addExamPage.classList.add("hidden");
    writeExamPage.classList.remove("hidden");
    test.name = examNameInput.value;
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    test.key = result;
    test.teacherID = currentTeacher.id;
    console.log(test);
  });

// Adding Choice Items
let totalChoice = 0;
document.querySelector("#add-choice").addEventListener("click", function (evt) {
  evt.preventDefault();
  if (totalChoice >= 5) {
    alert("Cant have more than 5 answers");
    return;
  }
  let cont = document.createElement("div");
  cont.id = "choice-item";
  cont.classList.add("choice-item", "flex", "items-center");

  let btn = document.createElement("input");
  btn.type = "radio";
  btn.className = "select-choice";
  btn.name = "choice";

  let inp = document.createElement("input");
  inp.type = "text";
  inp.placeholder = "Enter Choice";
  inp.className = "choice-input";

  let del = document.createElement("button");
  del.id = "remove-choice";
  del.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  class=""
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path
    fill-rule="evenodd"
    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
    clip-rule="evenodd"
  />
</svg>`;

  document.querySelectorAll("#remove-choice").forEach((btn) => {
    btn.addEventListener("click", function () {
      console.log("deleting");
      btn.parentElement.remove();
    });
  });
  cont.appendChild(btn);
  cont.appendChild(inp);
  cont.appendChild(del);

  choiceList.appendChild(cont);
  totalChoice++;
  // console.log(cont);
});

let questionNum = 1;
const qnum = document.getElementById("question-number");
qnum.textContent = `Question ${questionNum}`;

document
  .querySelector("#add-question")
  .addEventListener("click", function (evt) {
    evt.preventDefault();

    if (choiceList.childNodes.length === 0 || questionPrompt.value === "") {
      console.log("null");
      return;
    }
    let quests = document.querySelectorAll(".choice-input");
    // console.log(quests);
    let question = [];
    question.push(questionPrompt.value);
    quests.forEach((q) => {
      question.push(q.value);
    });
    let checked = false;
    document.querySelectorAll("#choice-item").forEach((answer, i) => {
      if (answer.childNodes[0].checked) {
        question[6] = i + 1;
        checked = true;
      }
      //   console.log(question);
    });
    if (!checked) {
      alert("choose an answer");
      return;
    }
    questionNum++;
    qnum.textContent = `Question ${questionNum}`;
    test.questions.push(question);
    console.log(test);
    document.querySelector(".write-exam-content").reset();
    questionPrompt.clear;
    while (choiceList.firstChild) {
      choiceList.firstChild.remove();
    }
    totalChoice = 0;
  });

document.getElementById("finalize-btn").addEventListener("click", function () {
  allExams.push(test);
  currentTeacher.exams.push(test.key);
  localStorage.setItem("teachers", JSON.stringify(allTeachers));
  localStorage.setItem("exams", JSON.stringify(allExams));
  test = null;
  window.open("dashboard.html", "_parent");
});
