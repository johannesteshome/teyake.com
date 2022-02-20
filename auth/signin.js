import { Teacher } from "../core.js";
("use strict");

let allTeachers = [];
if (!!localStorage.getItem("teachers")) {
  allTeachers = JSON.parse(localStorage.getItem("teachers"));
}

console.log(allTeachers);
const username = document.getElementById("uname");
const password = document.getElementById("pass");
const signinBtn = document.getElementById("signin-btn");

let currentSignin = -1;

signinBtn.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (username.value === "" || password.value === "") {
    document.getElementById("errorMsg").innerText = "Field Empty";
    return;
  }

  let found = false;
  for (let i = 0; i < allTeachers.length; i++) {
    if (
      username.value === allTeachers[i].username &&
      password.value === allTeachers[i].password
    ) {
      currentSignin = allTeachers[i].id;
      localStorage.setItem("current", currentSignin);
      console.log(currentSignin);
      found = true;
    }
  }
  if (found) {
    console.log("Successful");
    window.open("../dashboard/dashboard.html", "_parent");
  } else {
    document.getElementById("errorMsg").innerText =
      "Incorrect Username or Password.";
  }
});
