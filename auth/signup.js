import { Teacher } from "../core.js";
("use strict");

const fullName = document.getElementById("fullname-input");
const username = document.getElementById("username-input");
const password = document.getElementById("password-input");
const comfirmPassword = document.getElementById("comfirm-password");
const phoneNo = document.getElementById("phone-input");
const email = document.getElementById("email-input");
const instit = document.getElementById("institution-input");
const erorrLabel = document.getElementById("errorMsg");
const prev = document.getElementById("pre-signup");
const next = document.getElementById("next-signup");
const circles = document.querySelectorAll(".progress-step");
const numCircles = document.querySelectorAll(".num");

let currentActive = 1;

let allTeachers = [];
if (!!localStorage.getItem("teachers")) {
  allTeachers = JSON.parse(localStorage.getItem("teachers"));
}

console.log(allTeachers);

next.addEventListener("click", () => {
  if (currentActive == 1) {
    //the first input

    const namePattern = new RegExp(/^\w+.[ ]\w+.$/);
    const usernamePattern = new RegExp(/\s/);

    if (!namePattern.test(fullName.value)) {
      erorrLabel.innerText = "Invalid Name";
      return;
    }

    if (usernamePattern.test(username.value)) {
      erorrLabel.innerText = "Invalid Username spaces are not allowed.";
      return;
    } else if (username.value.length < 6) {
      erorrLabel.innerText =
        "Invalid Username minimum of 6 characters required for valid username.";
      return;
    } else if (username.value.length > 25) {
      erorrLabel.innerText =
        "Invalid Username maximum of 25 characters required for a valid username.";
      return;
    }
    if (usernameTaken(username.value)) {
      erorrLabel.innerText =
        "username is Already taken Please choose another one.";
      return;
    }

    if (password.value.length < 6) {
      erorrLabel.innerText =
        "Invalid password minimum of 6 characters required for valid password.";
      return;
    } else if (password.value.length > 25) {
      erorrLabel.innerText =
        "Invalid password maximum of 25 characters required for a valid username.";
      return;
    }

    if (password.value != comfirmPassword.value) {
      console.log(password.value, comfirmPassword.value);
      erorrLabel.innerText = "Password Does Not Match.";
      return;
    }

    if (
      fullName.value === "" ||
      username.value === "" ||
      password.value === ""
    ) {
      erorrLabel.innerText = "please Fill in All the Fields";
      return;
    }

    erorrLabel.innerText = "";

    currentActive++;
    if (currentActive > circles.length) {
      currentActive = circles.length;
    }
    const first = document.querySelectorAll(".first-form");
    first.forEach((elem) => {
      elem.classList.add("hidden");
    });
    const second = document.querySelectorAll(".second-form");
    second.forEach((elem) => {
      elem.classList.toggle("hidden");
    });

    update();
  } else {
    let teacher = new Teacher();
    console.log(teacher);

    const phonePattern = new RegExp(
      /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,4}$/
    );
    const emailPattern = new RegExp(/\w+@\w+.\w+(\.\w+)?$/);

    if (!phonePattern.test(phoneNo.value)) {
      erorrLabel.innerText = "Invalid phone Number.";
      return;
    }

    if (!emailPattern.test(email.value)) {
      erorrLabel.innerText = "Invalid Email Address.";
      return;
    }

    if (phoneNo.value === "" || email.value === "" || instit.value === "") {
      erorrLabel.innerText = "please Fill in All the Fields";
      return;
    }

    teacher.name = fullName.value;
    teacher.username = username.value;
    teacher.password = password.value;
    teacher.id = allTeachers.length + 1;
    teacher.email = email.value;
    teacher.phone = phoneNo.value.replace(/[^0-9+]/g, "");
    teacher.institution = instit.value;

    allTeachers.push(teacher);
    console.log("Signed Up");
    teacher = null;
    localStorage.setItem("teachers", JSON.stringify(allTeachers));
    window.open("signin.html", "_parent");
    console.log("we insert a link to go to from the registration page");
  }
});

prev.addEventListener("click", () => {
  currentActive--;
  if (currentActive < 1) currentActive = 1;

  const first = document.querySelectorAll(".first-form");
  first.forEach((elem) => {
    elem.classList.toggle("hidden");
  });
  const second = document.querySelectorAll(".second-form");
  second.forEach((elem) => {
    elem.classList.add("hidden");
  });

  update();
});

function update() {
  circles.forEach((circle, index) => {
    if (index < currentActive) {
      circle.classList.add("current-progress");
    } else {
      circle.classList.remove("current-progress");
    }
  });

  numCircles.forEach((num, index) => {
    index < currentActive
      ? num.classList.add("num-active")
      : num.classList.remove("num-active");
  });

  const active = document.querySelectorAll(".current-progress");

  if (currentActive == 1) {
    prev.disabled = true;
    next.innerText = "Next";
  } else if (currentActive == circles.length) {
    next.innerText = "Finish";
    prev.disabled = false;
  } else {
    prev.disabled = false;
    next.innerText = "Next";
  }
}

function usernameTaken(uname) {
  if (allTeachers.length == 0) {
    return false;
  }
  for (const teacher of allTeachers) {
    if (teacher.username == uname) return true;
  }
  return false;
}
