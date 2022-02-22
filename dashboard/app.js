("use strict");
import { Exam } from "../core.js";

const dashboardHome = document.querySelector(".dashboard-home");
const examListPage = document.querySelector(".exam-list");
const addExamContainer = document.querySelector(".add-exam-container");
const addExamPage = document.querySelector(".add-exam");
const writeExamPage = document.querySelector(".write-exam");
const resultPage = document.querySelector(".results-page");
const examNameInput = document.querySelector("#add-exam-name");
const questionPrompt = document.querySelector("#question-prompt");
const editQuestionPrompt = document.querySelector("#edit-question-prompt");
const links = document.querySelectorAll(".list-item");
const choiceList = document.querySelector(".choice-container");
const editChoiceList = document.querySelector(".edit-choice-container");
const previewQuestionList = document.querySelector(".preview-question-list");
const previewContainer = document.querySelector(".preview-content");
const editModal = document.querySelector(".edit-modal");
const logoutBtn = document.querySelector("#logout");
let pages = [dashboardHome, examListPage, addExamContainer, resultPage];

// let testExam = new Exam("testing");

//
// Grabbing all the necessary data from local storage
//
let currentSignin = -1;
if (!!localStorage.getItem("current"));
currentSignin = localStorage.getItem("current");
if (currentSignin === -1 || currentSignin === 0) {
  alert("please login");
  console.log("not logged in");
}
let allExams = [];
if (!!localStorage.getItem("exams")) {
  allExams = JSON.parse(localStorage.getItem("exams"));
}
let allStudents = [];
if (!!localStorage.getItem("students")) {
  allStudents = JSON.parse(localStorage.getItem("students"));
}
let allTeachers = [];
if (!!localStorage.getItem("teachers")) {
  allTeachers = JSON.parse(localStorage.getItem("teachers"));
}

//Selecting the current logged in teacher
let currentTeacher = allTeachers.find((teacher) => teacher.id == currentSignin);
console.log(currentTeacher);
let currentTeacherStudents = allStudents.filter((student) => {
  return currentTeacher.exams.includes(student.examkey);
});
//
//Functions executed at page load
//
window.onload = function () {
  // document.querySelectorAll(".list-item")[0].click();
};
//
//event handlers for all navigation links
//
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
logoutBtn.addEventListener("click", function () {
  localStorage.setItem("current", -1);
});
//
//Home Page Stat Cards data
//
document.querySelector("#studCount").textContent =
  currentTeacherStudents.length;
document.querySelector("#examCount").textContent = allExams.filter((test) => {
  return test.teacherID == Number(currentSignin);
}).length;
let avg = [];
currentTeacherStudents.forEach((student) => {
  avg.push(student.marked.reduce((prev, next) => prev + next));
});
if (avg.length != 0)
  document.querySelector("#avgScore").textContent =
    avg.reduce((prev, next) => prev + next) / avg.length;

//
//Display active exams on home page
//
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
//
//Display all Exams in Exam list page
//
function showAllExams() {
  document.querySelector(".all-exam-container").innerHTML = ``;
  allExams = JSON.parse(localStorage.getItem("exams"));
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
      <div id ="status"> 
      <span class = "status">${exam.status}</span> 
      </div>`;
      let btn = document.createElement("button");
      btn.type = "button";
      btn.className = "toggle-exam";
      btn.innerHTML = `${exam.status == "closed" ? "open" : "close"}`;
      cont.lastChild.appendChild(btn);
      let removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "remove-exam";
      removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>`;
      cont.lastChild.appendChild(removeBtn);

      btn.addEventListener("click", () => {
        let toggle = btn.parentElement.parentElement.childNodes[2].textContent;

        let found = allExams.find((exam) => exam.key == toggle);

        found.status = found.status == "open" ? "closed" : "open";
        localStorage.setItem("exams", JSON.stringify(allExams));
        showAllExams();
        showActive();
      });

      removeBtn.addEventListener("click", () => {
        let removeKey =
          btn.parentElement.parentElement.childNodes[2].textContent;
        if (
          confirm(
            "Are you sure you want to remove this exam?\nChanges cannot be undone!"
          ) == true
        ) {
          allExams = allExams.filter((exam) => exam.key != removeKey);
          localStorage.setItem("exams", JSON.stringify(allExams));
          showActive();
          showAllExams();
        } else {
          console.log("You canceled!");
        }
      });
      document.querySelector(".all-exam-container").appendChild(cont);
    });
  localStorage.setItem("exams", JSON.stringify(allExams));
}
showAllExams();

document.querySelector("#add-btn").addEventListener("click", function () {
  links[2].click();
});

//
//INITIALIZING THE EXAM
//
let test = new Exam("");
// var test = allExams[0];
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
//
// Adding Choice Items
//
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

//
// ADDING QUESTIONS
//
document
  .querySelector("#add-question")
  .addEventListener("click", function (evt) {
    evt.preventDefault();

    if (choiceList.childNodes.length === 0 || questionPrompt.value === "") {
      console.log("null");
      return;
    }
    let quests = document.querySelectorAll(".choice-input");
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
    document.querySelector(".write-exam-content").reset();
    questionPrompt.clear;
    while (choiceList.firstChild) {
      choiceList.firstChild.remove();
    }
    totalChoice = 0;
  });

//finish writing the exam
document.getElementById("finalize-btn").addEventListener("click", previewExam);
//
//Exam Preview After writing
//
var toBeEdited = 0;
function previewExam() {
  console.log(test);
  document.querySelector(".preview-exam").classList.remove("hidden");
  previewContainer.classList.toggle("hidden");
  editModal.classList.toggle("hidden");
  previewQuestionList.innerHTML = "";
  if (!!document.querySelector(".exam-title")) {
    document.querySelector(".exam-title").remove();
  }
  let examTitle = document.createElement("h1");
  examTitle.textContent = test.name;
  examTitle.className = "exam-title";
  previewQuestionList.parentElement.insertBefore(
    examTitle,
    previewQuestionList
  );

  test.questions.forEach((question, i) => {
    var qcontainer = document.createElement("div");
    qcontainer.className = "q-container";
    qcontainer.id = `${i}`;
    let prompt = document.createElement("h2");
    prompt.id = "question-prompt";
    console.log(question[0]);
    prompt.textContent = `${i + 1}.${question[0]}`;
    qcontainer.appendChild(prompt);
    let edit = document.createElement("button");
    edit.className = "edit-question";
    edit.textContent = "Edit Question";
    qcontainer.appendChild(edit);
    for (let j = 1; j < question.length - 1 && !!question[j]; j++) {
      var choiceContainer = document.createElement("div");
      choiceContainer.className = "choice-container";
      let choiceText = document.createElement("p");
      if (j == question[6]) choiceText.classList.add("selected-answer");
      let char = 64;
      choiceText.textContent = `${String.fromCharCode(char + j)}. ${
        question[j]
      }`;
      // choiceContainer.appendChild(choice);
      choiceContainer.appendChild(choiceText);
      qcontainer.appendChild(choiceContainer);
    }
    edit.addEventListener("click", function () {
      toBeEdited = Number(edit.parentElement.id);
      console.log(toBeEdited);
      previewContainer.classList.add("hidden");
      editModal.classList.remove("hidden");
      document.querySelector(".edit-choice-list").innerHTML = "";
      editQuestionPrompt.value = test.questions[toBeEdited][0];
      for (
        let j = 1;
        j < test.questions[toBeEdited].length - 1 &&
        !!test.questions[toBeEdited][j];
        j++
      ) {
        let cont = document.createElement("div");
        cont.classList.add(
          "choice-item",
          "flex",
          "items-center",
          "edit-choice-item"
        );

        let btn = document.createElement("input");
        btn.type = "radio";
        btn.className = "select-choice";
        btn.name = "choice";

        let inp = document.createElement("input");
        inp.type = "text";
        inp.placeholder = "Enter Choice";
        inp.className = "choice-input";
        inp.id = "edit-choice-input";
        inp.value = test.questions[toBeEdited][j];

        let del = document.createElement("button");
        del.id = "remove-choice";
        del.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"
        />
      </svg>`;

        document.querySelectorAll("#remove-choice").forEach((btn) => {
          btn.addEventListener("click", function (evt) {
            evt.preventDefault();
            console.log("deleting");
            totalChoice--;
            btn.parentElement.remove();
            for (let z = 0; z < 5; z++) {
              test.questions[toBeEdited][z] = undefined;
            }
            for (let z = 0; z < 5; z++) {
              test.questions[toBeEdited][z] =
                document.querySelectorAll("#edit-choice-input")[z].value;
            }
          });
        });
        cont.appendChild(btn);
        cont.appendChild(inp);
        cont.appendChild(del);
        document.querySelector(".edit-choice-list").appendChild(cont);
      }
    });
    qcontainer.appendChild(choiceContainer);
    previewQuestionList.appendChild(qcontainer);
  });
}

//
//Editing Exams Section
//Adding choice

document
  .querySelector("#add-choice-edit")
  .addEventListener("click", function () {
    let cont = document.createElement("div");
    cont.classList.add(
      "choice-item",
      "flex",
      "items-center",
      "edit-choice-item"
    );

    let btn = document.createElement("input");
    btn.type = "radio";
    btn.className = "select-choice";
    btn.name = "choice";

    let inp = document.createElement("input");
    inp.type = "text";
    inp.placeholder = "Enter Choice";
    inp.className = "choice-input";
    inp.id = "edit-choice-input";

    let del = document.createElement("button");
    del.id = "remove-choice";
    del.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"
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
    document.querySelector(".edit-choice-list").appendChild(cont);
  });

//
//Saving Edited questions
//
document.querySelector("#done-edit").addEventListener("click", function () {
  console.log("clicked");
  test.questions[toBeEdited][0] = editQuestionPrompt.value;
  for (
    let k = 1;
    k < document.querySelectorAll("#edit-choice-input").length + 1;
    k++
  ) {
    test.questions[toBeEdited][k] =
      document.querySelectorAll("#edit-choice-input")[k - 1].value;
  }

  document.querySelectorAll(".edit-choice-item").forEach((answer, i) => {
    if (answer.childNodes[0].checked) {
      test.questions[i][6] = i + 1;
    }
  });
  console.log(test);
  previewExam();
});

//Cancelling edit
document.querySelector("#cancel-edit").addEventListener("click", function () {
  previewExam();
});
//
//FINALIZING THE EXAM
//
document.querySelector("#done-preview").addEventListener("click", function () {
  allExams.push(test);
  currentTeacher.exams.push(test.key);
  localStorage.setItem("teachers", JSON.stringify(allTeachers));
  localStorage.setItem("exams", JSON.stringify(allExams));
  test = null;
  window.open("dashboard.html", "_parent");
});

//Close Preview
document
  .querySelector("#cancel-preview")
  .addEventListener("click", function (evt) {
    evt.preventDefault();
    test = null;
    window.open("dashboard.html", "_parent");
  });
//Cancel the Written Exam
document
  .querySelector("#cancel-exam")
  .addEventListener("click", function (evt) {
    evt.preventDefault();
    window.open("dashboard.html", "_parent");
  });

//
//Display Results Page
//

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
  <p class="score">${student.marked.reduce((acc, curr) => acc + curr)}/${
    student.marked.length
  }</p>
    </div>
    <div class="result-description flex flex-col gap-2 hidden">
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

document.querySelectorAll(".result-tile").forEach((tile) => {
  tile.addEventListener("click", function (evt) {
    evt.preventDefault();
    tile.parentElement.childNodes[2].classList.toggle("hidden");
  });
});
