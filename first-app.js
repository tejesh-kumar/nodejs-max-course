const fs = require('fs');

// // To create a new file
// fs.writeFileSync('repl.txt', 'REPL(Read Evaluate Print Loop) - This process executes when we just type node in terminal(Read), instructions get executed(Evaluate), logs result into terminal(Print), and Node.js runtime waiting for new instructions to execute(Loop).');

// // Arrow functions to solve 'this' keyword problem
const person = {
    name: 'tejesh',
    age: '25',
    greet: function() {console.log(this)}
} 

// const person = {                        
//     name: 'tejesh',
//     age: '25',
//     greet() {console.log(this)}
// } 

// person.greet();           result -- { name: 'tejesh', age: '25', greet: [Function: greet] }


// // To copy an array to new array or object to new Object
const array = [1, 2, 3];
// const newArray = array.slice();   result -- newArray = [1, 2, 3]
// const newArray = [...array]; console.log(newArray);             result -- newArray = [1, 2, 3]
// const newObject = {...person}; console.log(newObject);       result -- { name: 'tejesh', age: '25', greet: [Function: greet] }

// // Array & object destructuring
// const {name, age} = person;  console.log(name, age);         result -- tejesh 25
// const [a, b] = array;   console.log(a, b);                result -- 1 2