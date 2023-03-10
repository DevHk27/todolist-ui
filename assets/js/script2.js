// const emailId = window.prompt("Please Enter your Email ID:")
const emailId = "hardik@gmail.com"
//COMMON FUNCTIONS
//Convert data to json
const jsonconvertor = (task) => {
    var jsonobject = {}
    jsonobject["task"] = task
    jsondata = JSON.stringify(jsonobject)
    return jsondata
}

// Print the fetched list
const printlist = (tasklist) => {
    var taskll = "<table>"
    for (i = 0; i < tasklist.length; i++) {
        var num = i + 1
        taskll = taskll + '<tr class="tablerow"><td class="tabledata">' + num + '. </td><td class="tabledata tasklist-data">' + tasklist[i] + '</td><td class="tabledata"><button type="button" class="deletebutton" id="deletebtn" value="' + tasklist[i] + '" onclick="deleteTask(this.value)"><img src="./assets/static/deleteicon.ico" width="20" height="20"></button></tr>'
    }
    taskll = taskll + "</table>"
    document.getElementById("tasklist").innerHTML = taskll
}

//*************COMMON FUNCTIONS***************

// Fetch Data on Load
window.addEventListener('load', function () {
    fetch('http://localhost:8080/getTasklist', {
        method: 'POST',
        headers: {
            'Accept': 'application/json;',
            'Content-Type': 'application/json',
            'emailId': emailId
        }
    }).then(response => response.json())
        .then(json => {
            printlist(json.tasklistdata.tasklist)
        })
})

//Add Task
const addtaskbtn = document.getElementById("addtaskbtn")
const fetchdatafromform = () => {
    var task = document.getElementById("task").value
    if (task.length<1){
        document.getElementById("response").innerHTML = "Please enter the task first."
    }else{
        return task
    }
}
addtaskbtn.onclick = function() {
    addTask(fetchdatafromform())
}
const addTask = (task) =>{

    fetch('http://localhost:8080/addtask', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'emailId': emailId
        },
    body: jsonconvertor(task)
    }).then(response => response.json() )
        .then(json => {
            printlist(json.tasklistdata.tasklist)
        })
}

// DELETE TASK
const deleteTask = (task) => {
    fetch('http://localhost:8080/deletetask', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'emailId': emailId
        },
        body: jsonconvertor(task)
    }).then(response => response.json() )
        .then(json => {
            printlist(json.tasklistdata.tasklist)
        })

}


