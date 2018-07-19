// DEFINE UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

var tasks,li;
// LOAD all event listeners
loadEventListeners();

function loadEventListeners() {

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(t => {
      injectTasksToTaskList(t);
    })
  }



  form.addEventListener('submit', addTask);
  clearBtn.addEventListener('click', clearTasks);
  taskList.addEventListener('click', deleteTask)
  filter.addEventListener('input', filterTasks);


}
function injectTasksToTaskList(t) {
  li = document.createElement('li')
  li.className = 'collection-item'
  li.innerText = t;

  var a = document.createElement('a');
  a.href = '#';
  a.className = 'delete-item secondary-content';
  a.innerHTML = '<i class="fas fa-minus-circle"></i>'

  li.appendChild(a);
  taskList.appendChild(li);
}
function addTask(e) {

  if (taskInput.value !== '') {
    injectTasksToTaskList(taskInput.value);
    taskInput.value = '';

    //save to localstorage
    tasks.push(li.innerText);

    localStorage.setItem('tasks', JSON.stringify(tasks));

  }
  else {
    M.toast({ html: 'Add  a task!', classes: 'rounded red' })
  }
  e.preventDefault();
}

function clearTasks() {
  //slow  according to https://jsperf.com/while-vs-foreach

  // let children = Array.from(taskList.children);
  // children.forEach(e => {
  //   e.remove();
  // })

  //faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear localStorage
  localStorage.clear();
}

function deleteTask(e) {
  let a = e.target.parentElement;
  if (a.classList.contains('delete-item')) {
    
    a.parentElement.remove();
    M.toast({ html: `task "${a.parentElement.innerText}" removed!`, classes: 'rounded red' })

    //remove from localStorage
    let filteredTasks = tasks.filter(t => {
      return t !== a.parentElement.innerText
    });
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
  }

}

function filterTasks() {

  let childrenArray = Array.from(taskList.children);

  const filteredChildren = childrenArray.filter(e =>
    e.innerText.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1
  )

  childrenArray.forEach(e => {
    if (filteredChildren.indexOf(e) === -1) {
      e.setAttribute('style', 'display:none');
    }
    else {
      e.setAttribute('style', 'display:block');
    }
  })

}
