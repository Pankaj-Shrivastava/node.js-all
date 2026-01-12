// There was a need to iterate over various data structures
// in a new way that abstracts away the complexity of
// accessing elements onw by one and was at the same
// time uniform across the different data structures

// Iterables and Iterators - Protocols
// Strings, Arrays, Maps, Sets

// For..of loop
// const str = "Vishwas";
// for (const char of str) {
//   console.log(char);
// }

// const arr = ["V", "i", "s", "h", "w", "a", "s"];
// for (const item of arr) {
//   console.log(item);
// }

// An object which implements the iterable protocol
// is called an iterable

// For an object to be an iterable itmust implement a
// method at the key [Symbol.iterator]

// That method should not accept any argument and should
// return an object which conforms to the iterator protocol

// The iterator protocol decides whether an object is
// an iterator

// The object must have a next() method that returns an
// object with two properties

// value: which gives the current element

// done: which is a boolean value indicating whether or not
// there are any more elements that couls be iterated upon

// Make obj iterable
const obj = {
  [Symbol.iterator]: function () {
    let step = 0;
    const iterator = {
      next: function () {
        step++;
        if (step === 1) {
          return { value: "Hello", done: false };
        } else if (step === 2) {
          return { value: "World", done: false };
        }
        return { value: undefined, done: true };
      },
    };
    return iterator;
  },
};

for (const word of obj) {
  console.log(word);
}
