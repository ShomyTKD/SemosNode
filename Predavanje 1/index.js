var name = 'Zlatko';


console.log(`Pozdrav, ${name}`);
console.log('Pozdrav, ' + name);

function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet('World'); // Output: Hello, World!

const colors = ['red', 'green', 'blue'];

// Looping through the array
for (let color of colors) {
    console.log(color);
}

const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};

console.log(person.name); // Output: John
console.log(person['age']); // Output: 30

if (person.age >= 18) {
    console.log(`${person.name} is an adult.`);
} else {
    console.log(`${person.name} is a minor.`);
}

const lista = [
    { ime: 'John', godine: 30, grad: 'New York' },
    { ime: 'Jane', godine: 25, grad: 'Los Angeles' },
    { ime: 'Doe', godine: 35, grad: 'Chicago' },
    { ime: 'Alice', godine: 28, grad: 'New York' },
    { ime: 'Bob', godine: 40, grad: 'Los Angeles' },
    { ime: 'John', godine: 60, grad: 'New York' }
];

const filtriranaLista = lista.filter(osoba => osoba.godine > 28);

console.log("Filtrirana lista:", filtriranaLista);


const sumaGodina = lista.reduce((suma, osoba) => suma + osoba.godine, 0);
console.log("Ukupna suma godina:", sumaGodina)

const pronadjeni = lista.find(osoba => osoba.ime === 'John');
console.log("Pronađena osoba:", pronadjeni);

const person2 = {
    // Ključevi i vrednosti koji predstavljaju osobine osobe
    name: 'John', // Ime osobe
    age: 30, // Godine osobe
    address: { // Unutrašnji objekat koji predstavlja adresu osobe
        city: 'New York', // Grad u kom osoba živi
        zip: '10001', // Poštanski broj grada
        country: 'USA' // Država u kojoj se grad nalazi
    },
    // Niz koji predstavlja hobije osobe
    hobbies: ['reading', 'hiking', 'cooking'],
    // Metoda koja pozdravlja osobu
    greet: function () {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};

// Ispisivanje imena osobe
console.log(person2.name); // Output: John

// Ispisivanje grada u kojem osoba živi
console.log(person2.address.city); // Output: New York

// Ispisivanje prvog hobija osobe
console.log(person2.hobbies[0]); // Output: reading

// Pozivanje metode greet() da pozdravi osobu
person2.greet(); // Output: Hello, my name is John and I am 30 years old.
//####################################################################
function sayHello() {
    console.log(`Hello, my name is ${this.name}.`);
}

const person3 = {
    name: 'John',
    age: 30,
    greet: sayHello
};
/*
U strogoj modu (strict mode), this će biti undefined ako funkcija nije vezana za bilo koji objekat. 
To je deo strožih pravila u ES5 i kasnijim verzijama JavaScripta, 
namenjenih zaštiti od grešaka i povećanja sigurnosti.

ES5 (ECMAScript 5) je verzija specifikacije JavaScript jezika koju je objavila Evropska asocijacija za računarske mašine (ECMA) u decembru 2009. godine. 
Ova verzija predstavlja značajnu prekretnicu u razvoju JavaScripta jer donosi brojne nove karakteristike i unapređenja u odnosu na prethodne verzije
*/
//person3.greet(); // Output: Hello, my name is John.
sayHello.call({ name: name });
const anotherPerson = {
    name: 'Alice',
    age: 25
};
console.log('Odavde ide Alice');
sayHello.call(anotherPerson); // Output: Hello, my name is Alice.

//Domaci
/* 
forEach, map, filter, reduce, every, some
*/

// forEach (Calls a function for each element in array)
let text = '';
colors.forEach(concat)

function concat(item, index) {
    text += index + ": " + item + " ";
}

console.log(text);

// map
const numbers = [5, 8, 15, 22];
const newArr = numbers.map(number => number * 2);
console.log(newArr);

// filter
const filterResult = numbers.filter(checkEven)

function checkEven(number) {
    return number % 2 == 0
}

console.log(filterResult);

// reduce
const reducedNumbers = numbers.reduce(reduceFunction)

function reduceFunction(total, num) {
    return total - num;
}
console.log(reducedNumbers);

// every (check if EVERY value in array is over 5)
console.log(numbers.every(number => number > 5))

// some (check if ANY value is over given number)

console.log(numbers.some(number => number > 5))
