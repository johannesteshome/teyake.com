import { Teacher } from "../core.js";

let allTeachers = [];
let currentTeacher;
if (!!localStorage.getItem("teachers")) {
  allTeachers = JSON.parse(localStorage.getItem("teachers"));
  currentTeacher = JSON.parse(localStorage.getItem("current"));
}

const teacher = allTeachers.find((teacher) => teacher.id == currentTeacher);

const fullName = document.getElementById("name");
const username = document.getElementById("username");
const phoneNo = document.getElementById("phone");
const email = document.getElementById("email");
const instit = document.getElementById("institution");

const save = document.getElementById("save-edit-btn");
const changepassbtn = document.getElementById("changepass-btn");
const passContainer = document.querySelector(".password-changer");

fullName.value = teacher.name;
username.value = teacher.username;
phoneNo.value = teacher.phone;
email.value = teacher.email;
instit.value = teacher.institution;

const erorrLabel = document.getElementById("errorMsg");
console.log(teacher);

save.addEventListener("click", () => {
  const phonePattern = new RegExp(
    /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,4}$/
  );
  const emailPattern = new RegExp(/\w+@\w+.\w+(\.\w+)?$/);
  const namePattern = new RegExp(/^\w+.[ ]\w+.$/);
  const usernamePattern = new RegExp(/\s/);

  if (!phonePattern.test(phoneNo.value)) {
    erorrLabel.innerText = "Invalid phone Number.";
    phoneNo.focus();
    return;
  }

  if (!emailPattern.test(email.value)) {
    erorrLabel.innerText = "Invalid Email Address.";
    email.focus();
    return;
  }

  if (!namePattern.test(fullName.value)) {
    erorrLabel.innerText = "Invalid Name";
    fullName.focus();
    return;
  }
  if (usernameTaken(username.value)) {
    erorrLabel.innerText =
      "username is Already taken Please choose another one.";
    username.autofocus();
    return;
  }

  if (usernamePattern.test(username.value)) {
    erorrLabel.innerText = "Invalid Username spaces are not allowed.";
    username.autofocus();
    return;
  } else if (username.value.length < 6) {
    erorrLabel.innerText =
      "Invalid Username minimum of 6 characters required for valid username.";
    username.autofocus();
    return;
  } else if (username.value.length > 25) {
    erorrLabel.innerText =
      "Invalid Username maximum of 25 characters required for a valid username.";
    username.autofocus();
    return;
  }

  if (
    phoneNo.value === "" ||
    email.value === "" ||
    instit.value === "" ||
    fullName.value === "" ||
    username.value === ""
  ) {
    erorrLabel.innerText = "please Fill in All the Fields";
    return;
  }

  teacher.name = fullName.value;
  teacher.username = username.value;
  teacher.email = email.value;
  teacher.phone = phoneNo.value.replace(/[^0-9+]/g, "");
  teacher.institution = instit.value;

  localStorage.setItem("teachers", JSON.stringify(allTeachers));
  console.log(allTeachers);

  window.open("../dashboard/dashboard.html", "_parent");
});

function usernameTaken(uname) {
  if (allTeachers.length == 0) {
    return false;
  }

  for (let i = 0; i < allTeachers.length; i++) {
    if (allTeachers[i] == uname && i != currentTeacher) return true;
  }
  return false;
}

changepassbtn.addEventListener("click", () => {
  passContainer.classList.toggle("hidden");
});

document.getElementById("save-pass").addEventListener("click", () => {
  const pass = document.getElementById("prev-password-input");
  const newpass = document.getElementById("password-input");
  const comfirmPass = document.getElementById("password-input");
  const error = document.getElementById("PasserrorMsg");
  console.log(teacher.password);
  if (pass.value != teacher.password) {
    error.innerText = "incorrect current password.";
    return;
  }

  if (newpass.value.length < 6) {
    error.innerText =
      "Invalid password minimum of 6 characters required for valid password.";
    return;
  } else if (newpass.value.length > 25) {
    error.innerText =
      "Invalid password maximum of 25 characters required for a valid username.";
    return;
  }

  if (newpass.value != comfirmPass.value) {
    console.log(password.value, comfirmPass.value);
    error.innerText = "Password Does Not Match.";
    return;
  }
  error.innerText = "changed successfully";
  teacher.password = newpass.value;
  error.style.color = "green";
  setTimeout(() => {
    passContainer.classList.toggle("hidden");
  }, 2000);

  localStorage.setItem("teachers", JSON.stringify(allTeachers));
});
