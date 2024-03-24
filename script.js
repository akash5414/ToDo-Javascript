//Time task :
let time = document.getElementById("time");
let date = document.getElementById("date");
let taskList = document.getElementsByClassName("task-list");
let todoListValue = [];

function getTime() {
  let today = new Date();
  const weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  //Time Section :
  let HH = today.getHours();
  let ampm = HH >= 12 ? "PM" : "AM";
  HH = HH % 12;
  HH = HH ? HH : 12;
  if (HH < 10) {
    HH = "0" + HH;
  }

  // get the current minute (from 0 to 59)
  let MM = today.getMinutes();
  if (MM < 10) {
    MM = "0" + MM;
  }

  // get the current second (from 0 to 59)
  let SS = today.getSeconds();
  if (SS < 10) {
    SS = "0" + SS;
  }

  time.innerText = HH + ":" + MM + ":" + SS + " " + ampm;

  //Date Section :
  let dd = today.getDate();
  if (dd < 10) {
    dd = "0" + dd;
  }
  let mm = (today.getMonth() + 1).toString();
  if (mm.length === 1) {
    mm = "0" + mm;
  }
  let yyyy = today.getFullYear();

  let formattedDate = mm + "/" + dd + "/" + yyyy;

  let weekdayIndex = today.getDay();
  let weekdayName = weekday[weekdayIndex];

  let fullDate = weekdayName + " " + formattedDate;
  date.innerText = fullDate;
}
getTime();
setInterval(getTime, 1000);

//Todo Task :
let input = document.getElementById("input");
let task_list = document.getElementById("tasks");

// Creating Content class div
addContent = (task_enter) => {
  // headingText();
  let task_el = document.createElement("div");
  task_el.classList.add("task");
  let task_el_content = document.createElement("div");
  task_el_content.classList.add("content");

  const task_input = document.createElement("input");
  task_input.classList.add("text");
  task_input.type = "text";
  task_input.setAttribute("readonly", "readonly");
  task_input.value = task_enter;
  //Append task_input -> task_el_content
  task_el_content.appendChild(task_input);
  //Append task_el_content -> task_el
  task_el.appendChild(task_el_content);

  // Creating action class div
  let task_el_action = document.createElement("div");
  task_el_action.classList.add("action");

  //Creating edit button
  const task_edit = document.createElement("button");
  task_edit.classList.add("edit");
  task_edit.innerText = "Edit";

  //Creating delete button
  const task_delete = document.createElement("button");
  task_delete.classList.add("delete");
  task_delete.innerText = "Delete";

  //Append edit button -> task_el_action
  task_el_action.appendChild(task_edit);
  //Append delete button -> task_el_action
  task_el_action.appendChild(task_delete);
  //Append task_el_action -> task_el
  task_el.appendChild(task_el_action);

  //Append task_el -> task_list
  task_list.appendChild(task_el);

  input.value = "";

  //Edit the task
  let prev_task;
  task_edit.addEventListener("click", (e) => {
    if (task_edit.innerText.toLowerCase() == "edit") {
      prev_task = task_input.value;
      console.log(prev_task);
      task_edit.innerText = "Save";
      task_input.removeAttribute("readonly");
      task_input.focus();
    } else {
      console.log(prev_task + " " + task_input.value);
      if (
        todoListValue.includes(task_input.value) &&
        task_input.value != prev_task
      ) {
        showNotification(task_input.value);
      } else {
        const index = todoListValue.indexOf(prev_task);
        console.log(index);
        todoListValue[index] = task_input.value;
        setLocalStorage(todoListValue);
        task_edit.innerText = "Edit";
        task_edit.setAttribute("readonly", "readonly");
      }
    }
  });

  //Delete the task
  task_delete.addEventListener("click", (e) => {
    const index = todoListValue.indexOf(task_input.value);
    const x = todoListValue.splice(index, 1);
    task_list.removeChild(task_el);
    setLocalStorage(todoListValue);
    headingText();
  });
};

// Adding task in the localStorage
const setLocalStorage = (todo) => {
  return localStorage.setItem("todoData", JSON.stringify(todo));
};
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("todoData")) || [];
};
console.log(todoListValue);
const showTodoList = () => {
  todoListValue = getLocalStorage();
  console.log(todoListValue);
  todoListValue.forEach((curTodo) => {
    addContent(curTodo);
  });
};
showTodoList();

//Remove Tasks h3 under taskList when todoListValue is empty
const headingText = () => {
  console.log(todoListValue.length);
  if (todoListValue.length === 0) {
    document.getElementsByTagName("h3")[0].innerText = "";
  } else {
    document.getElementsByTagName("h3")[0].innerText = "Tasks";
  }
}
headingText();
console.log(todoListValue.length);

function add() {
  let task = input.value.trim();
  console.log(todoListValue.includes(task));
  if (task == "" || todoListValue.includes(task)) {
    showNotification(task);
  } else {
    addContent(task);
    todoListValue.push(task);
    setLocalStorage(todoListValue);
    console.log(todoListValue);
  }
}
showNotification = (task) => {
  alert(`Task must be unique and not empty : ${task}`);
};

//Sticky Header :
