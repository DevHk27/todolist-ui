var addtaskbtn = document.getElementById("addtaskbtn");
const tasklist = []

//Fetch data and add to list
addtaskbtn.onclick = function () {
    var task = document.getElementById("task").value
    tasklist[tasklist.length] = task
    sendList("abc@gmail.com", tasklist)
    printtasks(tasklist)
}
// Function to print tasks
function printtasks(tasklist) {
    var taskll = "<table>"
    for (i = 0; i < tasklist.length; i++) {
        var num = i + 1
        taskll = taskll + '<tr><td>' + num + '. </td><td>' + tasklist[i] + '</td><td><button type="button" id="deletebtn" value="' + num + '" onclick="DelTask(this.value)">delete</button></tr>'
    }
    taskll = taskll + "</table>"
    document.getElementById("tasklist").innerHTML = taskll
}

// Function to delete a task
function DelTask(buttonval) {
    tasklist.splice(buttonval - 1, 1)
    console.log(tasklist)
    sendList("abc@gmail.com", tasklist)
    printtasks(tasklist)
}

//Print tasks on window on load
window.addEventListener('load', function () {
    printtasks(tasklist)
})

// Send List to backend api
function sendList(email, tasklist) {
    var object = {};
    object["email"] = email
    object["tasklist"] = tasklist
    var jsonformdata = JSON.stringify(object)
    sendReq(jsonformdata)
}

//Function that sends list to backend api
function sendReq(jsonformdata) {
    fetch('http://localhost:8080/updatetask', {
        method: 'POST',
        headers: {
            'Accept': 'application/json;',
            'Content-Type': 'application/json'
        },
        body: jsonformdata
     }).then(response => response.json() )
     .then(json => {
        console.log(json.responseMessage)
     })
    }


function displayResponse(responsejson) {
                console.log("in fun")
                response = JSON.parse(responsejson);
                console.log(response)
            }