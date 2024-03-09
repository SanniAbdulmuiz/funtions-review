'use strict';

///////////////////////////////////////
// THE CALL AND APPLY METHODS
const lofthansa = {
  airline: 'Lufthansa',
  iatacode: 'LH',
  bookings: [],

  //books: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum}`
    );
    //this.bookings.push({ flight: `${this.iatacode}${flightNum}`, name });
  },
};

lofthansa.book(239, 'Jonas Schmedtmann');
lofthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iatacode: 'Ew',
  bookings: [],
};
const book = lofthansa.book;

//Does not work
//book(23, 'Sarah Williams');

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);
book.call(lofthansa, 239, 'Mary Cooper');
console.log(lofthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iatacode: 'LX',
  bookings: [],
};
book.call(swiss, 585, 'Mary Cooper');
console.log(swiss);

//Apply Methods
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

///////////////////////////////////////
// THE BIND METHOD
//book.call(eurowings, 23, 'Sarah Williams');
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lofthansa);
const bookLX = book.bind(swiss);

//The "bind" method returns a new function while the "call" and "apply" do not
bookEW(23, 'Steven Williams');

//Returns a new "eurowings" function here.
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martin Cooper');

//The bind methods with event listeners
lofthansa.planes = 300;
lofthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lofthansa.buyPlane.bind(lofthansa));

//Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVat = addTax.bind(null, 0.23);
//addVat = value => value + value * 0.23
console.log(addVat(100));
console.log(addVat(23));

const addedTax = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addedVat = addedTax(0.23);
console.log(addedVat(100));
console.log(addedVat(23));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each
 option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the 
  value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes 
  sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an 
input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as 
it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results 
are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and 
the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

// console.log(isPrivate);

(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);

///////////////////////////////////////
// Closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

///////////////////////////////////////
// More Closure Examples
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000); //Executes after 1000 milliseconds

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

///////////////////////////////////////
//FUNCTIONS RETURNING OTHER FUNCTIONS
/*const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting}${name}`);
  };
};
const greeterHey = greet('hey');
greeterHey('Jonas');
greeterHey('Steven');

//Also works like this
greet('Hello')('Jonas');

//Arrow function Challenge
const getCode = str => str.slice(0, 3);
const greetArrow = greeted => names => console.log(`${greeted} ${names}`);
greetArrow('Hello')('Abdulmuiz');

///////////////////////////////////////
//FUNCTIONS CALLING OTHER FUNCTIONS
/*
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Trnsformed by: ${fn.name}`);
};

transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

//JS USES callbacks all the time
const high5 = function () {
  console.log('🖐');
};
document.body
  .addEventListener('click', high5)
  [('Jonas', 'Martha', 'Adam')].forEach(high5);
// [('Jonas', 'Martha', 'Adam')].forEach(high5);

/*const flight = 'LH234';
const jonas = {
  name: 'Jonas Schemedtmann',
  passport: 247394856284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 247394856284) {
    alert('Checked in');
  } else {
    alert('Wrong password');
  }
};
checkIn(flight, jonas);
console.log(flight);
console.log(jonas);
//It is the same as doing .....
const flightNum = flight;
const passenger = jonas;

const newpassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};
newpassport(jonas);
checkIn(flight, jonas);
/*const bookings = [];
const createBooking = function (
  flightNum,
  newpassenger = 1,
  price = 199 * newpassenger
) {
  //ES5
  //newpassenger = newpassenger || 1
  //price = price = 199

  const booking = {
    flightNum,
    newpassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);*/
