class Student {
  constructor(name, id, email, examkey) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.examkey = examkey;
    this.answers = [];
  }
}
class Exam {
  constructor(name) {
    this.name = name;
    this.questions = [];
    this.key = 0;
  }
}

class Teacher {
  constructor(name, phone, email, institution, id) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.institution = institution;
    this.id = id;
    this.exams = [];
  }
}
export { Student, Exam, Teacher };
