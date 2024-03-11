var addCon = document.getElementById('addCon');
var PRdes = document.getElementById("PRdes");
var PRname = document.getElementById("PRname");
var CreateButton = document.getElementById("CreateButton");
var gridList = document.getElementById("grid-list")
var taskInfo = document.getElementsByClassName('task-info')
const divs = document.querySelectorAll('.task-info');
var projectName = document.getElementById('projectName');
var projectDescription = document.getElementById('projectDescription');
var TodayTask = document.getElementById("TodayTask");
var upcomingTask = document.getElementById("upcomingTask");
var option = document.getElementById('option');
var select = document.getElementsByTagName('select');
var addButton = document.getElementById('addButton');
var taskOperation = document.getElementById('taskOperation');
var show = 0;
var selectedProject = '';
var checkBoxValue = 0;
var colors = [
    "linear-gradient(rgb(190, 255, 190) , rgb(17, 218, 94))",
    "linear-gradient(rgb(190, 250, 255) , rgb(17, 195, 218))",
    "linear-gradient(rgb(237, 255, 190) , rgb(191, 218, 17))",
    "linear-gradient(rgb(255, 190, 190) , rgb(218, 84, 17))",
    "linear-gradient(rgb(255, 190, 232) , rgb(218, 17, 188))",
    "linear-gradient(rgb(203, 190, 255) , rgb(158, 17, 218))",
]
var indicatorColor = [
    "rgba(0, 255, 42, 0.368)",
    "rgba(0, 119, 255, 0.368)",
    "rgba(94, 94, 94, 0.368)"
]
function ClearProjectTask() {
    if (localStorage.TodayProjectsTasks ) {
        var LocalStorage = JSON.parse(localStorage.TodayProjectsTasks);
        if (LocalStorage.length === 0) {
            localStorage.removeItem("TodayProjectsTasks");
        }
    }
    if (localStorage.UpcomingProjectsTasks) {
        var LocalStorage = JSON.parse(localStorage.UpcomingProjectsTasks);
        if (LocalStorage.length === 0) {
            localStorage.removeItem("TodayProjectsTasks");
        }
    }
}
ClearProjectTask();


function popup() {
    if (show === 0) {
        addCon.classList.add('addConPopUp');
        taskOperation.style.opacity = 100;
        taskOperation.style.visibility = 'visible';

        addButton.innerText = 'x';
        show++;
    }
    else {
        taskOperation.style.opacity = 0;
        taskOperation.style.visibility = 'hidden';
        addCon.classList.remove('addConPopUp');
        addButton.innerText = '+';
        show--;
    }
}
if (!localStorage.ProjectId) {
    localStorage.ProjectId = '0';
}
else {
}
updateProjectList();
updateTodayTasks();

//Working Of Select Tag
function Operation(selectID) {
    var selectElement = document.getElementById(selectID)

    if (selectElement.value === 'Add') {
        if (localStorage.TodayProjectsTasks || localStorage.UpcomingProjectsTasks) {

            if (selectElement.id === "operation") {
                TodayTask.innerHTML = '';
            }
            else {
                upcomingTask.innerHTML = '';
            }
            var Alignment = document.createElement('div');
            Alignment.className = 'alignment';
            var Div = document.createElement('div');
            var InputTask = document.createElement('input');
            InputTask.id = 'TaskInput';
            InputTask.placeholder = "Enter Task"
            var btn = document.createElement('input');
            btn.type = "button";
            btn.id = "TaskCreator";
            btn.value = "Done";
            btn.addEventListener("click", e => AddTask(selectElement));
            var Indicator = document.createElement('select');
            Indicator.id = 'IndicatorSelecter';
            Indicator.innerHTML = '<option value="indicators-approved">Approved</option><option value="indicators-inprogress">In-Progress</option><option value="indicators-waiting">In-Waiting</option>'
            Div.appendChild(InputTask);
            Alignment.appendChild(Div);
            Alignment.appendChild(Indicator);
            Alignment.appendChild(btn)
            if (selectElement.id === "operation") {
                TodayTask.appendChild(Alignment);
            }
            else {
                upcomingTask.appendChild(Alignment);
            }
        }
    }
    else if (selectElement.value === 'Edit') {
        if (localStorage.TodayProjectsTasks || localStorage.UpcomingProjectsTasks) {
            if (selectElement.id === "operation") {
                var arr = JSON.parse(localStorage.TodayProjectsTasks);
                arr.forEach((element) => {
                    if (element.projectId === selectedProject) {
                        TodayTask.innerHTML = '';
                        element.todayTask.task.forEach((tasks) => {


                            var Alignment = document.createElement('div');
                            Alignment.className = 'alignment';
                            var Div = document.createElement('div');
                            var InputTask = document.createElement('input');
                            InputTask.className = 'TaskInput';
                            InputTask.value = tasks;
                            var Indicator = document.createElement('select');
                            Indicator.id = 'IndicatorSelecter';
                            Indicator.className = 'EditedIndicator'
                            Indicator.innerHTML = '<option value="indicators-approved">Approved</option><option value="indicators-inprogress">In-Progress</option><option value="indicators-waiting">In-Waiting</option>'
                            Div.appendChild(InputTask);
                            Alignment.appendChild(Div);
                            Alignment.appendChild(Indicator);
                            TodayTask.appendChild(Alignment);
                        })
                        var btn = document.createElement('input');
                        btn.type = "button";
                        btn.id = "TaskCreator";
                        btn.value = "Edit";
                        btn.addEventListener("click", e => EditTask(selectElement));
                        TodayTask.appendChild(btn);
                    }
                    else {
                        TodayTask.innerHTML = 'Nothing to edit';
                    }
                })
            }
            else {
                var arr = JSON.parse(localStorage.UpcomingProjectsTasks);
                arr.forEach((element) => {
                    if (element.projectId === selectedProject) {
                        upcomingTask.innerHTML = '';
                        element.upcomingTask.task.forEach((tasks) => {


                            var Alignment = document.createElement('div');
                            Alignment.className = 'alignment';
                            var Div = document.createElement('div');
                            var InputTask = document.createElement('input');
                            InputTask.className = 'TaskInput';
                            InputTask.value = tasks;
                            var Indicator = document.createElement('select');
                            Indicator.id = 'IndicatorSelecter';
                            Indicator.className = 'EditedIndicator'
                            Indicator.innerHTML = '<option value="indicators-approved">Approved</option><option value="indicators-inprogress">In-Progress</option><option value="indicators-waiting">In-Waiting</option>'
                            Div.appendChild(InputTask);
                            Alignment.appendChild(Div);
                            Alignment.appendChild(Indicator);
                            upcomingTask.appendChild(Alignment);



                        })
                        var btn = document.createElement('input');
                        btn.type = "button";
                        btn.id = "TaskCreator";
                        btn.value = "Edit";
                        btn.addEventListener("click", e => EditTask(selectElement));
                        upcomingTask.appendChild(btn);
                    }
                    else {
                        upcomingTask.innerHTML = 'Nothing to edit';
                    }
                })
            }


        }
        else {
            if (selectElement.id === "operation") {
                TodayTask.innerHTML = 'No project created yet.';
            }
            else {
                upcomingTask.innerHTML = 'No project created yet.';
            }
        }
    }
    else {
        if (localStorage.TodayProjectsTasks || localStorage.UpcomingProjectsTasks) {
            if (selectElement.id === "operation") {
                TodayTask.innerHTML = '';
                var arr = JSON.parse(localStorage.TodayProjectsTasks);
                arr.forEach((element) => {
                    if (element.projectId === selectedProject) {
                        element.todayTask.task.forEach((tasks, index) => {
    
    
                            var Alignment = document.createElement('div');
                            Alignment.className = 'alignment';
                            var Div = document.createElement('div');
                            var Itag = document.createElement('input');
                            Itag.type = "checkbox"
                            Itag.className = 'CheckBox';
                            Itag.value = checkBoxValue;
                            checkBoxValue++;
                            var H5 = document.createElement('h5');
                            H5.innerText = tasks;
                            var Input = document.createElement('input');
                            Input.className = element.todayTask.indicator[index];
                            if (element.todayTask.indicator[index] === 'indicators-approved') {
                                Input.value = 'Approved'
                            }
                            else if (element.todayTask.indicator[index] === 'indicators-inprogress') {
                                Input.value = 'In-Progress'
                            }
                            else {
                                Input.value = 'In-Waiting'
                            }
                            Input.type = 'button';
                            Div.appendChild(Itag);
                            Div.appendChild(H5);
                            Alignment.appendChild(Div);
                            Alignment.appendChild(Input);
                            TodayTask.appendChild(Alignment);
    
    
    
                        })
                        var btn = document.createElement('input');
                        btn.type = "button";
                        btn.id = "TaskCreator";
                        btn.value = "Delete";
                        btn.addEventListener("click", e => DeleteTask(selectElement));
                        checkBoxValue = 0;
                            TodayTask.appendChild(btn);
                    }
                    else {
                            TodayTask.innerHTML = 'Nothing to Delete';
                    }
                });
            }
            else {
                upcomingTask.innerHTML = '';
                var arr = JSON.parse(localStorage.UpcomingProjectsTasks);
                arr.forEach((element) => {
                    if (element.projectId === selectedProject) {
                        element.upcomingTask.task.forEach((tasks, index) => {
    
    
                            var Alignment = document.createElement('div');
                            Alignment.className = 'alignment';
                            var Div = document.createElement('div');
                            var Itag = document.createElement('input');
                            Itag.type = "checkbox"
                            Itag.className = 'CheckBox';
                            Itag.value = checkBoxValue;
                            checkBoxValue++;
                            var H5 = document.createElement('h5');
                            H5.innerText = tasks;
                            var Input = document.createElement('input');
                            Input.className = element.upcomingTask.indicator[index];
                            if (element.upcomingTask.indicator[index] === 'indicators-approved') {
                                Input.value = 'Approved'
                            }
                            else if (element.upcomingTask.indicator[index] === 'indicators-inprogress') {
                                Input.value = 'In-Progress'
                            }
                            else {
                                Input.value = 'In-Waiting'
                            }
                            Input.type = 'button';
                            Div.appendChild(Itag);
                            Div.appendChild(H5);
                            Alignment.appendChild(Div);
                            Alignment.appendChild(Input);
                            upcomingTask.appendChild(Alignment);
    
    
    
                        })
                        var btn = document.createElement('input');
                        btn.type = "button";
                        btn.id = "TaskCreator";
                        btn.value = "Delete";
                        btn.addEventListener("click", e => DeleteTask(selectElement));
                        checkBoxValue = 0;
                            upcomingTask.appendChild(btn);
                    }
                    else {
                            upcomingTask.innerHTML = 'Nothing to Delete';
                    }
                });
            }
        }
        else {
            if (selectElement.id === "operation") {
                TodayTask.innerHTML = 'No project created yet.';
            }
            else {
                upcomingTask.innerHTML = 'No project created yet.';
            }
        }
    }

    selectElement.selectedIndex = 0;
}


//Create Task And Add it
function AddTask(selectElement) {
    var TaskInput = document.getElementById('TaskInput');
    var IndicatorSelecter = document.getElementById('IndicatorSelecter');
    if (selectElement.id === "operation") {
        var ProjectTasks = { "projectId": selectedProject, "todayTask": { 'task': [TaskInput.value], 'indicator': [!IndicatorSelecter.value ? "indicators-approved" : IndicatorSelecter.value] } }
        console.log(IndicatorSelecter.value)
        var Tasks = [];
        Tasks.push(ProjectTasks);
        var StringJson = JSON.stringify(Tasks);
        if (localStorage.TodayProjectsTasks) {
            var checkId = JSON.parse(localStorage.TodayProjectsTasks);
            checkId.forEach((element) => {
                if (element.projectId === selectedProject) {
                    element.todayTask.task.push(ProjectTasks.todayTask.task[0]);
                    element.todayTask.indicator.push(ProjectTasks.todayTask.indicator[0]);
                    localStorage.TodayProjectsTasks = JSON.stringify(checkId);
                }
                else {
                    localStorage.TodayProjectsTasks += StringJson;
                    var LocalString = localStorage.TodayProjectsTasks;
                    var CorrectString = LocalString.replace("][", ",");
                    localStorage.TodayProjectsTasks = CorrectString;
                }
            })
            console.log(checkId);
        }
        else {
            localStorage.TodayProjectsTasks = StringJson;
            console.log(localStorage.TodayProjectsTasks);
        }
        updateTodayTasks();

    }
    else {
        var ProjectTasks = { "projectId": selectedProject, "upcomingTask": { 'task': [TaskInput.value], 'indicator': [!IndicatorSelecter.value ? "indicators-approved" : IndicatorSelecter.value] } }
        console.log(IndicatorSelecter.value)
        var Tasks = [];
        Tasks.push(ProjectTasks);
        var StringJson = JSON.stringify(Tasks);
        if (localStorage.UpcomingProjectsTasks) {
            var checkId = JSON.parse(localStorage.UpcomingProjectsTasks);
            checkId.forEach((element) => {
                if (element.projectId === selectedProject) {
                    element.upcomingTask.task.push(ProjectTasks.upcomingTask.task[0]);
                    element.upcomingTask.indicator.push(ProjectTasks.upcomingTask.indicator[0]);
                    localStorage.UpcomingProjectsTasks = JSON.stringify(checkId);
                }
                else {
                    localStorage.UpcomingProjectsTasks += StringJson;
                    var LocalString = localStorage.UpcomingProjectsTasks;
                    var CorrectString = LocalString.replace("][", ",");
                    localStorage.UpcomingProjectsTasks = CorrectString;
                }
            })
            console.log(checkId);
        }
        else {
            localStorage.UpcomingProjectsTasks = StringJson;
            console.log(localStorage.UpcomingProjectsTasks);
        }
        updateUpcomingTasks();
    }
}

// For Editing Tasks
function EditTask(selectElement) {
    if (selectElement.id === "operation") {
        var AllTasks = JSON.parse(localStorage.TodayProjectsTasks);
        var EditedTasks = document.querySelectorAll(".TaskInput");
        var EditedIndicator = document.querySelectorAll(".EditedIndicator");
        AllTasks.forEach((element) => {
            if (element.projectId === selectedProject) {
                EditedTasks.forEach((tasks, index) => {
                    element.todayTask.task[index] = tasks.value;
                });
                EditedIndicator.forEach((tasks, index) => {
                    element.todayTask.indicator[index] = tasks.value;
                })
                var StringJson = JSON.stringify(AllTasks);
                localStorage.TodayProjectsTasks = StringJson;
            }
        });
        updateTodayTasks();
    }
    else {
        var AllTasks = JSON.parse(localStorage.UpcomingProjectsTasks);
        var EditedTasks = document.querySelectorAll(".TaskInput");
        var EditedIndicator = document.querySelectorAll(".EditedIndicator");
        AllTasks.forEach((element) => {
            if (element.projectId === selectedProject) {
                EditedTasks.forEach((tasks, index) => {
                    element.upcomingTask.task[index] = tasks.value;
                });
                EditedIndicator.forEach((tasks, index) => {
                    element.upcomingTask.indicator[index] = tasks.value;
                })
                var StringJson = JSON.stringify(AllTasks);
                localStorage.UpcomingProjectsTasks = StringJson;
            }
            console.log(element);
        });
        updateUpcomingTasks();
    }
}

//For Deleting Tasks
function DeleteTask(selectElement) {
    if (selectElement.id === "operation") {
        var arr = [];
        var AllTasks = JSON.parse(localStorage.TodayProjectsTasks);
        var Checkboxes = document.querySelectorAll(".CheckBox");
        Checkboxes.forEach((element) => {
            if (element.checked) {
                arr.push(element.value);
                console.log(arr);
            }
        });
        var arr1 = arr.reverse();
        console.log(arr1)
    
        AllTasks.forEach((element, elementIndex) => {
            if (element.projectId === selectedProject) {
    
                arr1.forEach((index) => {
                    element.todayTask.task.splice(index, 1);
                    element.todayTask.indicator.splice(index, 1);
                });
                if (element.todayTask.task.length === 0) {
                    AllTasks.splice(elementIndex, 1);
                }
                var StringJson = JSON.stringify(AllTasks);
                localStorage.TodayProjectsTasks = StringJson;
            }
            arr = [];
        });
        
        updateTodayTasks();
    }
    else {
        var arr = [];
        var AllTasks = JSON.parse(localStorage.UpcomingProjectsTasks);
        var Checkboxes = document.querySelectorAll(".CheckBox");
        Checkboxes.forEach((element) => {
            if (element.checked) {
                arr.push(element.value);
                console.log(arr);
            }
        });
        var arr1 = arr.reverse();
        console.log(arr1)
    
        AllTasks.forEach((element, elementIndex) => {
            if (element.projectId === selectedProject) {
    
                arr1.forEach((index) => {
                    element.upcomingTask.task.splice(index, 1);
                    element.upcomingTask.indicator.splice(index, 1);
                });
                if (element.upcomingTask.task.length === 0) {
                    AllTasks.splice(elementIndex, 1);
                }
                var StringJson = JSON.stringify(AllTasks);
                localStorage.UpcomingProjectsTasks = StringJson;
            }
            arr = [];
        });

        updateUpcomingTasks();
    }


}






//It creates and shows how many projects we have .
CreateButton.addEventListener("click", () => {
    var a = {};
    var projectList = [];
    var strProjects = "";
    var jsonString = "";
    a = { 'name': PRname.value, 'description': PRdes.value, 'ProjectId': localStorage.ProjectId };
    projectList.push(a);
    localStorage.ProjectId++;
    if (localStorage.projects) {
        localStorage.projects += JSON.stringify(projectList);
        jsonString = localStorage.projects
        strProjects = jsonString.replace('][', ',');
        localStorage.projects = strProjects;
        taskOperation.style.opacity = 0;
        taskOperation.style.visibility = 'hidden';
        addCon.classList.remove('addConPopUp');
        addButton.innerText = '+';
        show--;
    }
    else {
        localStorage.projects = JSON.stringify(projectList);
        taskOperation.style.opacity = 0;
        taskOperation.style.visibility = 'hidden';
        addCon.classList.remove('addConPopUp');
        addButton.innerText = '+';
        show--;
    }
    PRname.value = "";
    PRdes.value = "";
    updateProjectList();
});



function updateProjectList() {
    var totalProjects = document.getElementById('totalProjects');
    gridList.innerHTML = "";
    var colorIndex = 0;
    if (localStorage.projects) {
        var parseProjects = [];
        parseProjects = JSON.parse(localStorage.projects);
        totalProjects.innerHTML = `(${parseProjects.length})`;
        parseProjects.forEach((project, index) => {
            if (index >= 6) {
                var AllTask = document.querySelectorAll('.task-info');
                var last = AllTask.item(AllTask.length - 1)
                last.innerHTML = "";
                var taskInfo = document.createElement('div');
                taskInfo.className = 'task-info';
                var taskImg = document.createElement('div');
                taskImg.className = 'taskImg';
                taskImg.style.background = colors[colorIndex];
                last.style.boxShadow = `2px 2px 10px grey`;
                taskImg.innerHTML = `${parseProjects.length - 5}+`;
                var Name = document.createElement('span');
                Name.innerText = `MORE`;
                last.appendChild(taskImg);
                last.appendChild(Name);


            }
            else {
                var taskInfo = document.createElement('div');
                taskInfo.className = 'task-info';
                var taskImg = document.createElement('div');
                taskImg.className = 'taskImg';
                if (colorIndex <= 5) {
                    taskImg.style.background = colors[colorIndex];
                    taskImg.style.boxShadow = `2px 2px 10px grey`;
                    colorIndex++
                }
                else {
                    colorIndex = 0;
                    taskImg.style.boxShadow = `2px 2px 10px grey`;
                    taskInfo.style.background = colors[colorIndex];

                }
                var shortName = project.name.split(" ");
                shortName.forEach((element) => {
                    taskImg.innerHTML += element[0];
                })
                taskImg.innerHTML
                var Name = document.createElement('span');
                Name.innerText = `${project.name}`;
                taskInfo.appendChild(taskImg);
                taskInfo.appendChild(Name);
                taskInfo.addEventListener("click", () => {
                    projectName.innerText = project.name;
                    projectDescription.innerText = project.description;
                    Selected(project.ProjectId);
                })
                gridList.appendChild(taskInfo);
            }
        })
    }
    else {
        gridList.innerHTML = "No Projects Yet";

    }
}


//Selected Function to know which function is going to be selected.....
function Selected(prId) {
    selectedProject = prId;
    updateTodayTasks();
    updateUpcomingTasks();
}
function updateTodayTasks() {
    ClearProjectTask();

    if (selectedProject === "") {
        TodayTask.innerHTML = 'Select Any Project'
    }
    else if (localStorage.TodayProjectsTasks) {

        TodayTask.innerHTML = "";
        var AllTodayTasks = JSON.parse(localStorage.TodayProjectsTasks);
        AllTodayTasks.forEach((element) => {
            if (element.projectId === selectedProject) {
                console.log(element.projectId + '  ' + selectedProject)
                element.todayTask.task.forEach((task, index) => {
                    var Alignment = document.createElement('div');
                    Alignment.className = 'alignment';
                    var Div = document.createElement('div');
                    var Itag = document.createElement('i');
                    Itag.className = 'bx bx-list-ul list';
                    var H5 = document.createElement('h5');
                    H5.innerText = task;
                    var Input = document.createElement('input');
                    Input.className = element.todayTask.indicator[index];
                    if (element.todayTask.indicator[index] === 'indicators-approved') {
                        Input.value = 'Approved'
                    }
                    else if (element.todayTask.indicator[index] === 'indicators-inprogress') {
                        Input.value = 'In-Progress'
                    }
                    else {
                        Input.value = 'In-Waiting'
                    }
                    Input.type = 'button';
                    Div.appendChild(Itag);
                    Div.appendChild(H5);
                    Alignment.appendChild(Div);
                    Alignment.appendChild(Input);
                    TodayTask.appendChild(Alignment);
                })
            }
            else {
                TodayTask.innerHTML = ''
                TodayTask.innerHTML = 'No Task Created Yet'
            }
        })
        if (AllTodayTasks.length === 0) {
            TodayTask.innerHTML = ''
            TodayTask.innerHTML = 'No Task Created Yet'

        }
    }
    else {
        TodayTask.innerHTML = ''
        TodayTask.innerHTML = 'No Task Created Yet'

    }
}
function updateUpcomingTasks() {
    ClearProjectTask();

    if (selectedProject === "") {
        upcomingTask.innerHTML = 'Select Any Project'
    }
    else if (localStorage.UpcomingProjectsTasks) {

        upcomingTask.innerHTML = "";
        var AllTodayTasks = JSON.parse(localStorage.UpcomingProjectsTasks);
        AllTodayTasks.forEach((element) => {
            if (element.projectId === selectedProject) {
                console.log(element.projectId + '  ' + selectedProject)
                element.upcomingTask.task.forEach((task, index) => {
                    var Alignment = document.createElement('div');
                    Alignment.className = 'alignment';
                    var Div = document.createElement('div');
                    var Itag = document.createElement('i');
                    Itag.className = 'bx bx-list-ul list';
                    var H5 = document.createElement('h5');
                    H5.innerText = task;
                    var Input = document.createElement('input');
                    Input.className = element.upcomingTask.indicator[index];
                    if (element.upcomingTask.indicator[index] === 'indicators-approved') {
                        Input.value = 'Approved'
                    }
                    else if (element.upcomingTask.indicator[index] === 'indicators-inprogress') {
                        Input.value = 'In-Progress'
                    }
                    else {
                        Input.value = 'In-Waiting'
                    }
                    Input.type = 'button';
                    Div.appendChild(Itag);
                    Div.appendChild(H5);
                    Alignment.appendChild(Div);
                    Alignment.appendChild(Input);
                    upcomingTask.appendChild(Alignment);
                })
            }
            else {
                upcomingTask.innerHTML = ''
                upcomingTask.innerHTML = 'No Task Created Yet'
            }
        })
        if (AllTodayTasks.length === 0) {
            upcomingTask.innerHTML = ''
            upcomingTask.innerHTML = 'No Task Created Yet'

        }
    }
    else {
        upcomingTask.innerHTML = ''
        upcomingTask.innerHTML = 'No Task Created Yet'

    }
}