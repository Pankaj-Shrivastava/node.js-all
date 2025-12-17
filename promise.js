function myPromise() {
  return new Promise(
    // didn't pass resolve as param in first attempt
    (resolve) => {
      resolve("hello world");
    },
    () => {
      reject("hello kitty");
    }
  );
}

// Matching written code with the below code

function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Did something");
      resolve("<https://example.com/>");
    }, 200);
  });
}
