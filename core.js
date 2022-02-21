// Declaring the classes for use across the site.

class Student {
  constructor(name, id, email, examkey) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.examkey = examkey;
    this.answers = [];
    this.marked = [];
  }
}

let date = new Date();

class Exam {
  constructor(name) {
    this.teacherID = 0;
    this.name = name;
    this.questions = [];
    this.key = 0;
    this.date = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    this.status = "open";
  }
}

class Teacher {
  constructor(name, phone, email, institution, id, username, password) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.institution = institution;
    this.id = id;
    this.exams = [];
  }
}
export { Student, Exam, Teacher };
