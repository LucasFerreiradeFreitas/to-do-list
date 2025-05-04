// Recupera tarefas do localStorage ou cria uma lista vazia
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all"; // Pode ser: 'all', 'active', ou 'completed'

//Essa função salva a lista atual de tarefas no localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); //Converte a lista (tasks) em texto com JSON.stringify()
}
//renderTasks() é a função que atualiza a tela, exibindo as tarefas.
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = ""; //Primeiro, limpa a <ul id="taskList"> com innerHTML = ""

  //Filtra as tarefas com base no filtro selecionado
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true; // se for 'all'
  });
  //Para cada tarefa, cria um elemento <li>
  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`; //Adiciona a classe completed se a tarefa estiver concluída
    //Cria o conteúdo HTML da tarefa
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">✖</button>
    `;
    list.appendChild(li);
  });

  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active')); //Remove a classe active de todos os botões de filtro
  document.querySelector(`.filters button[onclick="filterTasks('${currentFilter}')"]`).classList.add('active'); //Adiciona a classe active ao botão correspondente ao filtro atual, para mostrar visualmente qual filtro está ativo
}
//Pega o conteúdo digitado no input.
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
}
//Inverte o estado da tarefa: se era concluída, vira não concluída, e vice-versa.
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1); //splice(index, 1) remove 1 item na posição index da lista
  saveTasks();
  renderTasks();
}
//Atualiza o filtro ativo (currentFilter) e chama renderTasks() para atualizar a visualização
function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

// Inicializa ao carregar a página
renderTasks();
