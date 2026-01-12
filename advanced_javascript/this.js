// this

// The javascript this keyword which is used in a
// function, referes to the object it belongs to

// It makes functions reusable by letting you
// decide the object value

// this value is determined entirely by how a function
// is called

// function sayMyName(name) {
//   console.log(`My name is ${name}`);
// }

// sayMyName("Walter White");
// sayMyName("Heisenberg");

// How to determine 'this'?
// Implicit binding
// Explicit binding
// New binding
// Default binding

// Implicit binding
const person = {
  name: "Vishwas",
  sayMyName: function () {
    console.log(`My name is ${this.name}`);
  },
};

// person.sayMyName();

function sayMyName() {
  console.log(`My name is ${this.name}`);
}
// Explicit binding
sayMyName.call(person);

// New binding

function Person(name) {
  // this = {}
  this.name = name;
}
const p1 = new Person("Vishwas");
const p2 = new Person("Batman");

console.log(p1.name, p2.name);

// Default binding
// It is the fallback binding if none of the other rules match

globalThis.name = "Superman";
sayMyName();

// Order of precedence
// New binding > Explicit binding > Implicit binding > Default binding
