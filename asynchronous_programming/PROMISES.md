# Asynchronous Programming (Promises)

## Promises

A Promise is an object.
A Promise is a returned object to which we attach callbacks, instead of calling callbacks into a function.

For Example:

NORMAL JS FILE

    function successCallback(result) {
      console.log(`Audio file is ready at URL: ${result}`);
    }

    function failureCallback(error) {
      console.log(`Error generating audio file: ${error}`);
    }

    createAudioFileAsync(audioSettings, successCallback, failureCallback);

createAudioFileAsync() rewritten to return a promise

    createAudioFileAsync(audioSettings).then(successCallback, failureCallback);

### Chaining (callback hell)

doSomething(function (result) {
doSomethingElse(result, function (newResult) {
doThirdThing(newResult, function (finalResult) {
console.log(`Got the final result: ${finalResult}`);
}, failureCallback);
}, failureCallback);
}, failureCallback);

Here's the magic: the then() function return a **new promise**, different from the original:

const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);

#### Working Example

function doSomething() {
return new Promise((resolve) => {
setTimeout(() => {
console.log("Did something");
resolve("<https://example.com/>");
}, 200);
});
};

If error handling code is the same for all steps, you can attach it to the end of the chain:

doSomething()
.then(function (result) {
return doSomethingElse(result);
})
.then(function (newResult) {
return doThirdThing(newResult);
})
.then(function (finalResult) {
console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);

- **With Arrow Function**

doSomething()
.then((result) => doSomethingElse(result))
.then((newResult) => doThirdThing(newResult))
.then((finalResult) => {
console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);

- **Returning Promises**

It is important to always return promises from then callbacks, even if the promise always resolves to undefined. If the previous handler started a promise but did not return it, there's no way to track its settlement anymore, and the promise is said to be "floating".

doSomething()
  .then((url) => {
    // Missing `return` keyword in front of fetch(url).
    fetch(url);
  })
  .then((result) => {
    // result is undefined, because nothing is returned from the previous
    // handler. There's no way to know the return value of the fetch()
    // call anymore, or whether it succeeded at all.
  });

  doSomething()
  .then((url) => {
    // `return` keyword added
    return fetch(url);
  })
  .then((result) => {
    // result is a Response object
  });

As a rule of thumb, whenever your operation encounters a promise, return it and defer its handling to the next then handler.

const listOfIngredients = [];

doSomething()
  .then((url) => {
    // `return` keyword now included in front of fetch call.
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        listOfIngredients.push(data);
      });
  })
  .then(() => {
    console.log(listOfIngredients);
    // listOfIngredients will now contain data from fetch call.
  });

Even better, you can flatten the nested chain into a single chain, which is simpler and makes error handling easier.

  doSomething()
  .then((url) => fetch(url))
  .then((res) => res.json())
  .then((data) => {
    listOfIngredients.push(data);
  })
  .then(() => {
    console.log(listOfIngredients);
  });

- **Async/Await**

Using async/await can help you write code that's more intuitive and resembles synchronous code.

async function logIngredients() {
  const url = await doSomething();
  const res = await fetch(url);
  const data = await res.json();
  listOfIngredients.push(data);
  console.log(listOfIngredients);
}

**Note:** async/await has the same concurrency semantics as normal promise chains. await within one async function does not stop the entire program, only the parts that depend on its value, so other async jobs can still run while the await is pending.

### Error Handling

Promises solve a fundamental flaw with the callback pyramid of doom, by catching all errors, even thrown exceptions and programming errors. This is essential for functional composition of asynchronous operations. All errors are now handled by the catch() method at the end of the chain, and you should almost never need to use try/catch without using async/await.

    async function foo() {
      try {
        const result = await doSomething();
        const newResult = await doSomethingElse(result);
        const finalResult = await doThirdThing(newResult);
        console.log(`Got the final result: ${finalResult}`);
      } catch (error) {
        failureCallback(error);
      }
    }

#### Nesting

### Composition

### Cancellation

### Creating a Promise around an old callback API

### Timing
