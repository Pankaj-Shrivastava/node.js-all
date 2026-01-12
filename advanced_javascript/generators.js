function normalFunction() {
  console.log("Hello");
  console.log("World");
}

normalFunction();

// A generator function can stop mid-way
// and then can continue from where it stopped
function* generatorFunction() {
  yield "Hello";
  yield "World";
}

const generatorObject = generatorFunction();

for (const word of generatorObject) {
  console.log(word);
}
