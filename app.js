// REDUX GAME
const Redux = window.Redux;

const state = {
  list: []
};

const store = Redux.createStore(reducer, state);

function reducer(state, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case "ADD":
      newState.list = state.list.concat([{ id: action.id, text: action.text }]);
      return newState;

    case "DEL":
      newState.list = newState.list.filter(task => task.id !== action.id);
      return newState;

    default:
      return state;
  }
}

const actionAdd = (text, id) => {
  return {
    type: "ADD",
    text,
    id
  };
};

const actionDelete = id => {
  return {
    type: "DEL",
    id
  };
};
// END REDUX GAME

let id = 0;

function addTask(event) {
  if (event.keyCode === 13) {
    const task = event.target.value;
    store.dispatch(actionAdd(task, id));
    id++;
    event.target.value = "";
  }
}

function deleteTask(id) {
  store.dispatch(actionDelete(id));
}

function showTasks() {
  const tasksList = document.getElementById("tasksList");
  const listHtml = store
    .getState()
    .list.map(task => {
      return `<li>${task.text} <button onclick="deleteTask(${task.id})">Eliminar</button></li>`;
    })
    .join("");

  tasksList.innerHTML = listHtml;
}

store.subscribe(showTasks);

window.onload = () => {
  showTasks();
};
