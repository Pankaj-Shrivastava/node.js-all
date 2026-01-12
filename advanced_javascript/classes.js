// Classes are syntactical sugar over js prototypes

class Person {
  constructor(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
  }

  sayMyName() {
    return this.firstName + " " + this.lastName;
  }
}

const classP1 = new Person("Bruce", "Wayne");
console.log(classP1.sayMyName());

class SuperHero extends Person {
  constructor(fName, lName) {
    super(fName, lName);
    this.isSuperHero = true;
  }

  fightCrime() {
    console.log("Fighting crime");
  }
}

const batman = new SuperHero("Bruce", "Wayne");
console.log(batman.sayMyName());
