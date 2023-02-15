(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const script_form = document.querySelector("#form");
    const taskInput = document.querySelector("#taskInput");
    const todoList = document.querySelector(".toDo__list");
    document.querySelector(".list-toDo__empty");
    let tasks = [];
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach((function(task) {
            renderTask(task);
        }));
    }
    checkEmptyList();
    script_form.addEventListener("submit", addTask);
    todoList.addEventListener("click", deleteTask);
    todoList.addEventListener("click", doneTask);
    function addTask(e) {
        e.preventDefault();
        const taskText = taskInput.value;
        const newTasks = {
            id: Date.now(),
            text: taskText,
            done: false
        };
        tasks.push(newTasks);
        saveToLocalStorage();
        renderTask(newTasks);
        taskInput.value = "";
        taskInput.focus();
        checkEmptyList();
    }
    function deleteTask(e) {
        if ("delete" !== e.target.dataset.action) return;
        const nodeParent = e.target.closest(".list-toDo__item");
        const id = Number(nodeParent.id);
        tasks = tasks.filter((task => task.id !== id));
        saveToLocalStorage();
        nodeParent.remove();
        checkEmptyList();
    }
    function doneTask(e) {
        if ("done" !== e.target.dataset.action) return;
        const nodeParent = e.target.closest(".list-toDo__item");
        const id = Number(nodeParent.id);
        const task = tasks.find((task => task.id === id));
        task.done = !task.done;
        saveToLocalStorage();
        nodeParent.classList.toggle("list-toDo__item-task--active");
    }
    function checkEmptyList() {
        if (0 === tasks.length) {
            const emptyListHTML = `<li class="list-toDo__item list-toDo__empty" id="emptyList">\n      <p class="list-toDo__text">To-do list is empty</p>\n      </li>`;
            todoList.insertAdjacentHTML("afterbegin", emptyListHTML);
        }
        if (tasks.length > 0) {
            const emptyListEl = document.querySelector("#emptyList");
            emptyListEl ? emptyListEl.remove() : null;
        }
    }
    function saveToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    function renderTask(task) {
        const cssClass = task.done ? "list-toDo__item list-toDo__item-task list-toDo__item-task--active" : "list-toDo__item list-toDo__item-task";
        const taskHTML = `<li id="${task.id}" class="${cssClass}">\n            <span class="list-toDo__title">${task.text}</span>\n            <div class="list-toDo__buttons">\n               <button class="list-toDo__btn list-toDo__btn--done" type="button"\n                  data-action="done">\n               </button>\n               <button class="list-toDo__btn list-toDo__btn--delete" type="button"\n                  data-action="delete">\n               </button>\n            </div>\n         </li>`;
        todoList.insertAdjacentHTML("beforeend", taskHTML);
    }
    window["FLS"] = true;
    isWebp();
})();