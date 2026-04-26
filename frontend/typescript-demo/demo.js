"use strict";
// Basic types
let username = "Sudhanshu";
let age = 20;
// Class
class User {
    name;
    constructor(name) {
        this.name = name;
    }
    greet() {
        console.log("Hello " + this.name);
    }
}
// Object
let user1 = new User(username);
user1.greet();
