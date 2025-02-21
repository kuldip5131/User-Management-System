let addData = document.getElementById("addUser");
let userName = document.getElementById("username");
let userEmail = document.getElementById("email");
let recordsDisplay = document.getElementById("records");
let btntext = addData.innerText;
let userArray = [];
let edit_id = null;

// Check if users exist in localStorage, if yes, load them
let objects = localStorage.getItem("users");

if (objects) {
    userArray = JSON.parse(objects);
}
DisplayInfo();

// Add or update user when button is clicked
addData.addEventListener("click", function () {
    addUser();
});

// Add user function
function addUser() {
    let name = userName.value;
    let email = userEmail.value;

    if (name === "" || email === "") {
        alert("Both name and email are required.");
        return;
    }

    // Email validation
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (edit_id != null) {
        // If we are editing an existing user, replace it in the array
        userArray.splice(edit_id, 1, {
            name: name,
            email: email,
        });
        edit_id = null;
    } else {
        // Otherwise, add a new user to the array
        userArray.push({
            name: name,
            email: email,
        });
    }

    saveInfo(userArray);
    userName.value = "";
    userEmail.value = "";
    addData.textContent = btntext;  // Reset button text
}

// Save data to localStorage
function saveInfo(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem("users", str);
    DisplayInfo(); // Update the displayed table with new data
}

// Display users in the table
function DisplayInfo() {
    let statement = "";
    userArray.forEach((user, i) => {
        statement += `<tr>
        <td scope="row">${i + 1}</td>
        <td class="username-cell">${user.name}</td>
        <td class="username-cell">${user.email}</td>
        <td>
            <i class="btn text-white fa fa-edit btn-info mx-2" onclick="editUser(${i})"></i>
            <i class="btn btn-danger text-white fa fa-trash" onclick="deleteUser(${i})"></i>
        </td>
        </tr>`;
    });
    recordsDisplay.innerHTML = statement;  // Update the table rows
}

// Edit user functionality
function editUser(id) {
    edit_id = id;
    userName.value = userArray[id].name;
    userEmail.value = userArray[id].email;
    addData.textContent = "Save Changes";  // Change button text for saving changes
}

// Delete user functionality
function deleteUser(id) {
    userArray.splice(id, 1);
    saveInfo(userArray);
}

// Listen for Enter key on the input fields
userName.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addUser();  // Trigger the same action as clicking the "Add User" button
    }
});

userEmail.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addUser();  // Trigger the same action as clicking the "Add User" button
    }
});
