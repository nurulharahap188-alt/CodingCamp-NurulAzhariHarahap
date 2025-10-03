const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const todoBody = document.getElementById("todo-body");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Event tombol tambah
addBtn.addEventListener("click", addTask);

// Event tombol delete all
deleteAllBtn.addEventListener("click", () => {
  todoBody.innerHTML = `
    <tr>
      <td colspan="4" style="text-align:center; color:#aaa;">No task found</td>
    </tr>
  `;
});

function addTask() {
  const task = todoInput.value.trim();
  const dueDate = dateInput.value;

  if (task === "" || dueDate === "") {
    alert("Please fill task and due date!");
    return;
  }

  // Hapus teks "No task found" kalau ada
  if (todoBody.children.length === 1 && todoBody.children[0].cells.length === 1) {
    todoBody.innerHTML = "";
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${task.toUpperCase()}</td>
    <td>${dueDate}</td>
    <td><span class="status-text">Pending</span></td>
    <td>
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </td>
  `;

  todoBody.appendChild(row);

  // Event complete
  row.querySelector(".complete-btn").addEventListener("click", () => {
    row.querySelector("td:nth-child(1)").classList.toggle("status-done");
    const statusText = row.querySelector(".status-text");
    statusText.textContent = statusText.textContent === "Pending" ? "Done" : "Pending";
  });

  // Event delete
  row.querySelector(".delete-btn").addEventListener("click", () => {
    row.remove();
    if (todoBody.children.length === 0) {
      todoBody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align:center; color:#aaa;">No task found</td>
        </tr>
      `;
    }
  });

  // Reset input
  todoInput.value = "";
  dateInput.value = "";
}
