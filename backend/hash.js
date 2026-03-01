import bcrypt from "bcrypt";

const password = "Admin1234";   // choose your admin password
const hash = await bcrypt.hash(password, 10);

console.log("Password:", password);
console.log("Hash:", hash);