("use strict");
import { Student, Exam, Teacher } from "../core.js";

const dashboardHome = document.querySelector(".dashboard-home");
const examListPage = document.querySelector(".exam-list");
const addExamContainer = document.querySelector(".add-exam-container");
const addExamPage = document.querySelector(".add-exam");
const writeExamPage = document.querySelector(".write-exam");
const resultPage = document.querySelector(".results-page");
const examNameInput = document.querySelector("#add-exam-name");
const questionPrompt = document.querySelector("#question-prompt");
const links = document.querySelectorAll(".list-item");
const choiceList = document.querySelector(".choice-container");
const previewContainer = document.querySelector(".preview-content");
const logoutBtn = document.querySelector("#logout");
let pages = [dashboardHome, examListPage, addExamContainer, resultPage];

// let testExam = new Exam("testing");

let currentSignin = -1;
if (!!localStorage.getItem("current"));
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
  allStudents = JSON.parse(localStorage.getItem("students"));
}
let totalStudents = allStudents.length;
// console.log(allStudents);
let allTeachers = [];
if (!!localStorage.getItem("teachers")) {
  allTeachers = JSON.parse(localStorage.getItem("teachers"));
}
let currentTeacher = allTeachers.find((teacher) => teacher.id == currentSignin);

let currentTeacherStudents = allStudents.filter((item) => {
  return currentTeacher.exams.includes(item.examkey);
});

window.onload = function () {
  document.querySelectorAll(".list-item")[0].click();
};

links.forEach((link, i) => {
  link.addEventListener("click", function () {
    showActive;
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

logoutBtn.addEventListener("click", function () {
  localStorage.setItem("current", 0);
});

function showActive() {
  document.querySelector(".exam-tile-container").innerHTML = "";
  allExams = JSON.parse(localStorage.getItem("exams"));
  console.log(allExams);
  allExams
    .filter((test) => {
      return test.status == "open" && test.teacherID == Number(currentSignin);
      //
    })
    .forEach((exam) => {
      let cont = document.createElement("div");
      cont.className = "exam-tile relative";
      cont.innerHTML = `<p class="exam-name">${exam.name}</p>
    <p class="exam-key">${exam.key}</p>
    <p class="date-created">${exam.date}</p>
    <p class="status">${exam.status}</p>
    `;
      document.querySelector(".exam-tile-container").appendChild(cont);
    });

  if (
    allExams.filter((test) => {
      return test.status == "open" && test.teacherID == Number(currentSignin);
    }).length == 0
  ) {
    let text = document.createElement("p");
    text.className = "text-center active-notif";
    text.textContent = "You have no open exams at the moment";
    document.querySelector(".exam-tile-container").appendChild(text);
  }
}
showActive();
// Page Structure

function showAllExams() {
  document.querySelector(".all-exam-container").innerHTML = ``;
  allExams
    .filter((test) => {
      return test.teacherID == Number(currentSignin);
    })
    .forEach((exam) => {
      let cont = document.createElement("div");
      cont.className = "exam-tile relative";
      cont.innerHTML = `<p class="exam-name">${exam.name}</p>
    <p class="exam-key">${exam.key}</p>
    <p class="date-created">${exam.date}</p>
    <div id ="status"> <span class = "status">${exam.status}</span> </div>`;
      let btn = document.createElement("button");
      btn.type = "button";
      btn.className = "toggle-exam";
      btn.innerHTML = `${exam.status == "closed" ? "open" : "close"}`;
      cont.lastChild.appendChild(btn);
      let removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "remove-exam";
      removeBtn.innerHTML = `x`;
      cont.lastChild.appendChild(removeBtn);
      btn.addEventListener("click", () => {
        let removeKey =
          btn.parentElement.parentElement.childNodes[2].textContent;
        let found = allExams.find((exam) => exam.key == removeKey);
        found.status = found.status == "open" ? "closed" : "open";
        localStorage.setItem("exams", JSON.stringify(allExams));
        showAllExams();
        showActive();
        // let warning = document.createElement("div");
        // let text = document.createElement("p");
        // text.textContent = "Are you sure?";
        // text.className = "text-center";
        // let okBtn = document.createElement("button");
        // okBtn.textContent = "Yes";
        // warning.appendChild(text);
        // warning.appendChild(okBtn);
      });
      removeBtn.addEventListener("click", () => {
        let removeKey =
          btn.parentElement.parentElement.childNodes[2].textContent;
        allExams = allExams.filter((exam) => exam.key != removeKey);
        localStorage.setItem("exams", JSON.stringify(allExams));
        showAllExams();
        showActive();
      });

      document.querySelector(".all-exam-container").appendChild(cont);
    });
  localStorage.setItem("exams", JSON.stringify(allExams));
}

showAllExams();

document.querySelector("#add-btn").addEventListener("click", function () {
  pages.forEach((page) => {
    page.classList.add("hidden");
  });
  links.forEach((el) => {
    el.classList.remove("active");
  });
  pages[2].classList.remove("hidden");
  links[2].classList.add("active");
});

// console.log(links[0]);

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
    // console.log(test);
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
    btn.addEventListener("click", function (evt) {
      evt.preventDefault();
      console.log("deleting");
      totalChoice--;
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
    // console.log(test);
    document.querySelector(".write-exam-content").reset();
    questionPrompt.clear;
    while (choiceList.firstChild) {
      choiceList.firstChild.remove();
    }
    totalChoice = 0;
  });

const previewExam = function () {
  document.querySelector(".preview-exam").classList.remove("hidden");
  let examTitle = document.createElement("h1");
  examTitle.textContent = test.name;
  examTitle.className = "exam-title";
  previewContainer.appendChild(examTitle);

  test.questions.forEach((question, i) => {
    var qcontainer = document.createElement("div");
    qcontainer.className = "q-container";
    let prompt = document.createElement("h2");
    prompt.id = "question-prompt";
    prompt.textContent = `${i + 1}.${question[0]}`;
    qcontainer.appendChild(prompt);

    for (let j = 1; j < question.length - 1 && question[j] != null; j++) {
      var choiceContainer = document.createElement("div");
      choiceContainer.className = "choice-container";
      let choiceText = document.createElement("p");
      let char = 64;
      choiceText.textContent = `${String.fromCharCode(char + j)}. ${
        question[j]
      }`;

      // choiceContainer.appendChild(choice);
      choiceContainer.appendChild(choiceText);
      // console.log(choiceContainer);
      qcontainer.appendChild(choiceContainer);
    }

    qcontainer.appendChild(choiceContainer);
    previewContainer.appendChild(qcontainer);
  });
};

document.getElementById("finalize-btn").addEventListener("click", previewExam);
document.querySelector("#done-preview").addEventListener("click", function () {
  allExams.push(test);
  currentTeacher.exams.push(test.key);
  localStorage.setItem("teachers", JSON.stringify(allTeachers));
  localStorage.setItem("exams", JSON.stringify(allExams));
  test = null;
  window.open("dashboard.html", "_parent");
});
document
  .querySelector("#cancel-preview")
  .addEventListener("click", function (evt) {
    evt.preventDefault();
    test = null;
    window.open("dashboard.html", "_parent");
  });

document
  .querySelector("#cancel-exam")
  .addEventListener("click", function (evt) {
    evt.preventDefault();
    window.open("dashboard.html", "_parent");
  });

currentTeacherStudents.forEach((student) => {
  let currentExam = allExams.find((exam) => exam.key == student.examkey);
  let checking = [];
  currentExam.questions.forEach((question) => {
    checking.push(question[6]);
  });

  let cont = document.createElement("div");
  cont.className = "result-container";
  cont.innerHTML = `<div class="result-tile">
  <p class="student-name">${student.name}</p>
  <p class="student-id">${student.id}</p>
  <p class="exam-name">${currentExam.name}</p>
  <p class="score">${student.marked.reduce((prev, next) => prev + next)}/${
    student.marked.length
  }</p>
</div>
<div class="result-description flex flex-col gap-2">
  <div class="flex">
  <p>Question Number:</p>
  <span class="monospace"> ${checking.map((_, i) => i + 1).join(" | ")}</span>
  </div>
  <div class="flex">
    <p>Correct Answers: </p>
    <span class="monospace">${checking
      .map((choice) => {
        return String.fromCharCode(choice + 64);
      })
      .join(" | ")}</span>
  </div>
  <div class="flex">
    <p>Student Answers:
    </p>
    <span class="monospace">${student.answers
      .map((choice) => {
        return String.fromCharCode(choice + 64);
      })
      .join(" | ")}</span>
  </div>
</div>`;

  document.querySelector(".result-tile-container").appendChild(cont);
});
