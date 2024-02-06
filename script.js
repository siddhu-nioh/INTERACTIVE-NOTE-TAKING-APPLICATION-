const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");
let currentUser = null;
var log = document.getElementById("login");
var reg = document.getElementById("register");

var box = document.querySelector(".form_box");


function register(){
    log.style.left = "-40rem";
    reg.style.left = "5rem";
    btn.style.left = "11rem";
    box.style.height = "90rem";   
}

function login(){
    log.style.left = "5rem";
    reg.style.left = "45rem";
    btn.style.left = "0";
    box.style.height = "55rem";     
}
// this doesnt need any storage will run at run time
let users = []; // Initialize an empty array to store signed-up users during runtime

function createAccount() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Check if the username already exists
    if (users.some(user => user.username === username)) {
        alert("Username already exists");
        return;
    }

    // Add the new user to the users array
    users.push({ username, password });
    alert("Account created successfully. Please log in to continue."); // You can customize this message as needed

    // Redirect to main page upon successful account creation
    
}

function authenticate() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Check if the username exists in the users array
    const user = users.find(user => user.username === username);

    if (user && user.password === password) {
        // Redirect to main page upon successful login
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password");
    }
}


function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box"; // Corrected the class name
    inputBox.setAttribute("contenteditable", "true");
    img.src = "delete.webp";
    img.addEventListener("click", function() {
        this.parentElement.remove(); // Use 'this' to refer to the current image being clicked
        updateStorage();
    });
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
});


notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "p") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage();
            };
        });
    }
});

document.addEventListener("keydown", event =>{
   if(event.key === "Enter"){
    document.execCommand("insertLineBreak");
    event.preventDefault();
   }
})
