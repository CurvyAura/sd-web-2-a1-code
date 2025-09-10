"use strict";

// sample data - expanded Star Wars characters with varied ages
const users = [
  { id: 1, name: "Luke Skywalker", age: 23 },
  { id: 2, name: "Darth Vader", age: 45 },
  { id: 3, name: "Princess Leia", age: 23 },
  { id: 4, name: "Obi-Wan Kenobi", age: 57 },
  { id: 5, name: "Yoda", age: 900 },
  { id: 6, name: "Han Solo", age: 32 },
  { id: 7, name: "Chewbacca", age: 234 },
  { id: 8, name: "R2-D2", age: 33 },
  { id: 9, name: "C-3PO", age: 112 },
  { id: 10, name: "Padmé Amidala", age: 27 },
];

// DOMS
const namesList = document.getElementById("names-list");
const youngNamesList = document.getElementById("young-characters-list");
const functionList = document.getElementById("function-list");
const ageFilterList = document.getElementById("age-filter-list");
const errorHandlingList = document.getElementById("error-handling-list");

// broken test data for exercise 6

// 1. Print out the names of each character in the console, then render them in the HTML list with id "names-list"

users.forEach(user => { // will iterate through every obj in users array. first: create a new <li> element, second: log name to console, third: sets the text of the <li> to the name, fourth: append the <li> (with name) to the HTML element "names-list".
  const li = document.createElement("li");

  console.log(user.name)

  li.textContent = user.name
  namesList.appendChild(li); // append will attach it to <ul> in the DOM.
});

// 2. Print out the names of characters whose age is less than 40 in the console, then render them in the HTML list with id "young-characters-list"
const filteredNames = users.filter(user => user.age < 40);
filteredNames.forEach((user) => {
  const li = document.createElement("li");

  console.log(user.name);

  li.textContent = user.name;
  youngNamesList.appendChild(li);
});

// 3. Create a reusable function that takes any array and uses logic to render a list of character names in the HTML. Use this function to populate the list with id "function-list"


function renderNamesList(array, elementId, errorDivId) { // Reusable func to take an array of objects, and the id of the HTML element to render the list to, also an optional error div id. 
  const errors = []; // this array is initialized to store the error messages. 
  const listElement = document.getElementById(elementId);

  while (listElement.firstChild) { // clear the list before new elements are added. 
    listElement.removeChild(listElement.firstChild);
  }

  array.forEach((entry) => {
    if (!entry.name) {
      console.error("Object missing name property:", entry); // If using concatenation you cant actually view the object and its properties when debugging.
      errors.push("Missing name for object with id: " + entry.id); // concatenate for string error msg.
      return;
    }
    const li = document.createElement("li");
    li.textContent = entry.name;
    listElement.appendChild(li);
  });

  if (errors.length > 0) {
    const errorDiv = document.getElementById(errorDivId || "error-messages");
    errorDiv.innerHTML = "";
    errors.forEach(function(error) {
      const p = document.createElement("p");
      p.className = "error-message";
      p.textContent = error;
      errorDiv.appendChild(p);
    });
  }
}

renderNamesList(users, "function-list");

// 4. Create a function that takes an array and an age threshold parameter. The function should only display characters whose age is below the given number. Render results in the list with id "age-filter-list"

function renderNamesUnderAge(array, ageThreshold, elementId, errorDivId) { // errorDivId is not required when calling, while first 3 are. This is because the renderNamesList will provide a default value for it.
  const filteredNames = array.filter((entry) => entry.age < ageThreshold);
  renderNamesList(filteredNames, elementId, errorDivId);
}

renderNamesUnderAge(users, 40, "age-filter-list");
// 5. Add error handling to your functions that will log an error message using console.error() if any object doesn't have a "name" property. Display any error messages in the div with id "error-messages"

// Added to renderNamesList func, which therefore is used by the renderNamesUnderAge func.
renderNamesList(users, "error-handling-list", "error-messages"); // No errors in users array, therefore no errors shown. 


// 6. Test your error handling by creating a second array that's intentionally broken (missing name properties) and passing it to your functions. Verify that your error handling works correctly and displays errors in the div with id "broken-array-errors"

const brokenUsers = [
  { id: 1, name: "Luke Skywalker", age: 23 }, // Luke Skywalker in age range, and not broken, so he will appear.
  { id: 2, age: 45 },
  { id: 3, age: 23 },
  { id: 4, age: 57 },
  { id: 5, name: "Yoda", age: 900 }, // In testing the age filtered func, which implicitly will test the other func, yoda is out of range so he will not appear.
  { id: 6, age: 32 },
  { id: 7, age: 234 },
  { id: 8, age: 33 },
  { id: 9, age: 112 },
  { id: 10, age: 27 },
];

renderNamesUnderAge(brokenUsers, 40, "broken-array-list", "broken-array-errors");