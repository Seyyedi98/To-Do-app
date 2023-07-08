import { useState } from "react";
import "./App.css";

export default function App() {
  return <TodoApp />;
}

function TodoApp() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(newTask) {
    setTasks((task) => [...task, newTask]);
  }

  function handleTaskToggle(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  }

  function handleTaskDelete(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="app">
      <Header onAddTasks={handleAddTask} />

      {tasks.length > 0 ? (
        <Body
          tasks={tasks}
          onTaskToggle={handleTaskToggle}
          onTaskDelete={handleTaskDelete}
        />
      ) : (
        <h2 className="message">Start adding new tasks! 🚀</h2>
      )}
    </div>
  );
}

function Header({ onAddTasks }) {
  const [task, setTask] = useState("");
  const id = crypto.randomUUID();
  const newTask = { id, task, isChecked: false };

  function handleSubmitTask(e) {
    e.preventDefault();

    if (!task) return;

    onAddTasks(newTask);
    setTask("");
  }

  return (
    <div className="header">
      <h1>To-DO App</h1>
      <form className="input-form" onSubmit={handleSubmitTask}>
        <input
          type="text"
          placeholder="Add Task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button>Add task</button>
      </form>
    </div>
  );
}

function Body({ tasks, onTaskToggle, onTaskDelete }) {
  return (
    <div className="main-body">
      <Todo
        tasks={tasks}
        onTaskToggle={onTaskToggle}
        onTaskDelete={onTaskDelete}
      />
      <Done
        tasks={tasks}
        onTaskToggle={onTaskToggle}
        onTaskDelete={onTaskDelete}
      />
    </div>
  );
}

function Todo({ tasks, onTaskToggle, onTaskDelete }) {
  const numTasks = tasks.filter((task) => !task.isChecked).length;

  return (
    <div className="todo">
      <div className="todo-heading">
        <h2>Todo</h2>
        <div className="task-counter">{numTasks}</div>
      </div>
      <div className="tasks">
        {tasks.map(
          (task) =>
            !task.isChecked && (
              <div className="task-container" key={task.id}>
                <Task
                  task={task}
                  onTaskToggle={onTaskToggle}
                  onTaskDelete={onTaskDelete}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}

function Done({ tasks, onTaskToggle, onTaskDelete }) {
  const numTasks = tasks.filter((task) => task.isChecked).length;

  return (
    <div className="todo">
      <div className="todo-heading">
        <h2>Done</h2>
        <div className="task-counter">{numTasks}</div>
      </div>
      <div className="tasks">
        {tasks.map(
          (task) =>
            task.isChecked && (
              <div key={task.id} className="task-container">
                <Task
                  task={task}
                  onTaskToggle={onTaskToggle}
                  onTaskDelete={onTaskDelete}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
function Task({ task, onTaskToggle, onTaskDelete }) {
  return (
    <>
      <div className="task-item">
        <input
          className="checkbox"
          type="checkbox"
          value={task.isChecked}
          checked={task.isChecked}
          onChange={() => onTaskToggle(task.id)}
        />
        <p
          style={
            task.isChecked
              ? { textDecoration: "line-through", color: "#ccc" }
              : {}
          }
        >
          {task.task}
        </p>
      </div>
      <button className="task-icon" onClick={() => onTaskDelete(task.id)}>
        ❌
      </button>
    </>
  );
}
