let addData = document.getElementById("addUser");
let userName = document.getElementById("username");
let userEmail = document.getElementById("email");
let recordsDisplay = document.getElementById("records");
let btntext = addData.innerText;
// console.log(recordsDisplay);
let userArray = [];
let edit_id = null;

let objects = localStorage.getItem("users");

if (objects) {
    userArray = JSON.parse(objects);
}
DisplayInfo();

addData.addEventListener("click", function () {
    let name = userName.value;
    let email = userEmail.value;
    // console.log(name)

    if (name === "" || email === "") {
        alert("Both name and email are required.");
        return;
    }

    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (edit_id != null) {
        userArray.splice(edit_id, 1, {
            name: name,
            email: email,
        });
        edit_id = null;
    } else {
        userArray.push({
            name: name,
            email: email,
        });
    }
    saveInfo(userArray);
    userName.value = "";
    userEmail.value = "";
    addData.textContent = btntext;
});

function saveInfo(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem("users", str);
    DisplayInfo()
}

function DisplayInfo() {
    let statement = ""
    userArray.forEach((user, i) => {
        statement += `<tr>
        <td scope="row">${i + 1}</td>
        <td class="username-cell">${user.name}</td>
        <td class="username-cell">${user.email}</td>
        <td><i class="btn text-white fa fa-edit btn-info" onclick="editUser(${i})"></i>
        <i class="btn btn-danger text-white fa fa-trash" onclick="deleteUser(${i})"></i>
        </td>
        </tr>`
    })
    recordsDisplay.innerHTML = statement;
}

function editUser(id) {
    edit_id = id;
    userName.value = userArray[id].name;
    userEmail.value = userArray[id].email;
    addData.textContent = "Save Changes Update";
}

function deleteUser(id) {
    userArray.splice(id, 1);
    saveInfo(userArray);
}