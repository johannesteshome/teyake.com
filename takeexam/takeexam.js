import { Student, Exam, Teacher } from "../core.js";

const inputKey = document.querySelector("#exam-key");
const enterBtn = document.querySelector("#enter-exam");
const examContainer = document.querySelector(".exam-container");
const studName = document.querySelector("#student-name");
const studEmail = document.querySelector("#student-email");
const studID = document.querySelector("#student-id");
const modal = document.querySelector(".modal");

let studKey = "-1";
if (!!localStorage.getItem("studKey")) {
  studKey = localStorage.getItem("studKey");
}

if (studKey == "-1") {
  alert("no key");
  console.log("no key");
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

let allTeachers = [];
if (!!localStorage.getItem("teachers")) {
  allTeachers = JSON.parse(localStorage.getItem("teachers"));
}

if (studKey != "-1") {
  document.querySelector("#exam-key").value = studKey;
}
let student = new Student();
let currentExam;

enterBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (
    inputKey.value == "" ||
    studName.value == "" ||
    studEmail.value == "" ||
    studID.value == ""
  ) {
    alert("Empty Fields");
    return;
  }
  let key = inputKey.value;
  // console.log(key);
  allExams.forEach((exam) => {
    if (key === String(exam.key)) {
      currentExam = exam;
    }
  });
  // console.log(currentExam);
  if (!currentExam) {
    alert("Exam does not exist");
  } else {
    modal.classList.add("hidden");
    document.querySelector("#submit-exam").classList.remove("hidden");
    document.querySelector("main").classList.remove("hidden");
    student.email = studEmail.value;
    student.id = studID.value;
    student.examkey = key;
    student.name = studName.value;
    student.answers = new Array(currentExam.questions.length).fill(0);
    student.marked = new Array(currentExam.questions.length).fill(0);
    showExam();
    document.documentElement.requestFullscreen();
    document.addEventListener("fullscreenchange", onFullScreenChange);
    document.addEventListener("webkitfullscreenchange", onFullScreenChange);
    document.addEventListener("mozfullscreenchange", onFullScreenChange);
  }
});

const onFullScreenChange = function () {
  var fullscreenElement =
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement;

  let i = 0;
  alert("here");
  if (!fullscreenElement) {
    console.log("not");
    alert("Warning: Return to fullscreen");
  } else {
    alert("in");
  }
};

const showExam = function () {
  let examTitle = document.createElement("h1");
  examTitle.textContent = currentExam.name;
  examTitle.className = "exam-title";
  examContainer.appendChild(examTitle);

  currentExam.questions.forEach((question, i) => {
    var qcontainer = document.createElement("div");
    qcontainer.className = "q-container";
    let prompt = document.createElement("h2");
    prompt.id = "question-prompt";
    prompt.textContent = `${i + 1}.${question[0]}`;
    qcontainer.appendChild(prompt);

    for (let j = 1; j < question.length - 1 && question[j] != null; j++) {
      var choiceContainer = document.createElement("div");
      choiceContainer.className = "choice-container";
      let choice = document.createElement("input");
      choice.type = "radio";
      choice.name = `c${i}`;
      choice.id = `c${i}${j}`;
      let choiceText = document.createElement("p");
      let char = 64;
      choiceText.textContent = `${String.fromCharCode(char + j)}. ${
        question[j]
      }`;

      choiceContainer.appendChild(choice);
      choiceContainer.appendChild(choiceText);
      // console.log(choiceContainer);
      qcontainer.appendChild(choiceContainer);
    }

    qcontainer.appendChild(choiceContainer);
    examContainer.appendChild(qcontainer);
  });
  console.log(student);
};

document.querySelector("#submit-exam").addEventListener("click", function () {
  let ansContainer = document.querySelectorAll(".q-container");
  ansContainer.forEach((question, i) => {
    question.childNodes.forEach((choice, j) => {
      if (choice.childNodes[0].checked) {
        student.answers[i] = j;
      }
    });
  });

  // console.log(student.answers);

  console.log(student.answers);
  let checking = [];
  currentExam.questions.forEach((question) => {
    checking.push(question[6]);
  });
  for (let j = 0; j < student.answers.length; j++) {
    if (student.answers[j] == checking[j]) {
      student.marked[j] = 1;
    }
  }
  console.log(student.marked);
  console.log(student.marked.reduce((prev, next) => prev + next));
  allStudents.push(student);
  // console.log(allStudents);
  student = null;
  localStorage.setItem("students", JSON.stringify(allStudents));
  // window.open("takeexam.html" ,"_parent");
});
