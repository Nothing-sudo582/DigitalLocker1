// Basic types
let username: string = "Sudhanshu";
let age: number = 20;

// Class
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): void {
    console.log("Hello " + this.name);
  }
}

// Object
let user1 = new User(username);
user1.greet();