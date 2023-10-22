document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addButton = document.getElementById("addButton");
  const completeAllButton = document.getElementById("completeAllButton");
  const completeSelectedButton = document.getElementById(
    "completeSelectedButton"
  );
  const clearAllButton = document.getElementById("clearAllButton");
  const taskCount = document.getElementById("taskCount");
  const completeCount = document.getElementById("completeCount");
  const remainingCount = document.getElementById("remainingCount");
  const taskList = document.getElementById("taskList");

  let tasks = [];
  let completedTasks = 0;

  // Initialize the "Add" button as disabled
  addButton.disabled = true;

  taskInput.addEventListener("input", function () {
    // Enable or disable the "Add" button based on input
    addButton.disabled = taskInput.value === "";
    addButton.style.color = taskInput.value === "" ? "#ccc" : "#4caf50";
  });

  addButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      tasks.push({ text: taskText, completed: false });
      updateTaskList();
      taskInput.value = "";
      // Disable the "Add" button after adding a task
      addButton.disabled = true;
      addButton.style.color = "#ccc";
    }
  });

  completeAllButton.addEventListener("click", function () {
    // Mark all tasks as completed
    tasks.forEach((task) => (task.completed = true));
    completedTasks = tasks.length;
    updateTaskList();
  });

  completeSelectedButton.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(".complete-checkbox");
    let anySelected = false;

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked && !tasks[index].completed) {
        tasks[index].completed = true;
        completedTasks++;
        updateTaskList();
        anySelected = true;
      }
    });

    if (anySelected) {
      updateTaskList();
    }
  });

  clearAllButton.addEventListener("click", function () {
    // Clear all tasks
    tasks = [];
    completedTasks = 0;
    updateTaskList();
  });

  function updateTaskList() {
    taskCount.textContent = tasks.length + " tasks";
    completeCount.textContent = completedTasks + " complete";
    const pendingTasks = tasks.length - completedTasks;
    remainingCount.textContent = pendingTasks + " pending";

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task-item");

      const completeCheckbox = document.createElement("input");
      completeCheckbox.type = "checkbox";
      completeCheckbox.classList.add("complete-checkbox");
      completeCheckbox.disabled = task.completed;
      completeCheckbox.checked = task.completed;

      const taskText = document.createElement("span");
      taskText.textContent = task.text;

      if (!task.completed) {
        const completeIcon = document.createElement("i");
        completeIcon.classList.add("fas", "fa-check", "complete-icon");
        completeIcon.dataset.index = index;
        completeIcon.addEventListener("click", function () {
          tasks[index].completed = true;
          completedTasks++;
          completeCheckbox.disabled = true;
          updateTaskList();
        });

        listItem.appendChild(completeCheckbox);
        listItem.appendChild(taskText);
        listItem.appendChild(completeIcon);
      } else {
        listItem.classList.add("completed");
        listItem.appendChild(completeCheckbox);
        listItem.appendChild(taskText);
      }

      taskList.appendChild(listItem);
    });
  }
});
