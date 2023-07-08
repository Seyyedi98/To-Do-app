import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div className="page">
      <TodoApp />
    </div>
  );
}

function TodoApp() {
  const [tasks, setNewTasks] = useState([]);
  const [view, setView] = useState("all");

  function handleAddTask(newTask) {
    setNewTasks((task) => [...task, newTask]);
  }

  function handleTaskToggle(id) {
    setNewTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  }

  function handleClearCompleted() {
    setNewTasks((tasks) => tasks.filter((task) => !task.isChecked));
  }

  function handleDeleteTask(id) {
    setNewTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="container">
      <h1 className="main-header">TODO</h1>
      <CreateTask onNewTask={handleAddTask} />
      <Tasks
        tasks={tasks}
        onTaskToggle={handleTaskToggle}
        view={view}
        onSetView={setView}
        onClearCompleted={handleClearCompleted}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

function CreateTask({ onNewTask }) {
  const [task, setTask] = useState();
  const id = crypto.randomUUID();
  const newTask = { id, task, isChecked: false };

  function handleSubmit(e) {
    e.preventDefault();

    setTask("");
    onNewTask(newTask);
  }

  return (
    <div className="card card-create-task">
      <div className="checkbox-border">
        <div className="checkbox"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Create a new todo..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </form>
    </div>
  );
}

function Tasks({
  tasks,
  onTaskToggle,
  view,
  onSetView,
  onClearCompleted,
  onDeleteTask,
}) {
  return (
    <div className="tasks">
      {tasks.length === 0 && (
        <div className="card message-card">
          <h2 className="message">Start adding new tasks...</h2>
        </div>
      )}

      {view === "all" &&
        tasks.map((task) => (
          <div key={task.id} className="task">
            <Task
              task={task}
              onTaskToggle={onTaskToggle}
              onDeleteTask={onDeleteTask}
            />
          </div>
        ))}

      {view === "active" &&
        tasks.map((task) => (
          <div key={task.id} className="task">
            {!task.isChecked && (
              <Task
                task={task}
                onTaskToggle={onTaskToggle}
                onDeleteTask={onDeleteTask}
              />
            )}
          </div>
        ))}

      {view === "completed" &&
        tasks.map((task) => (
          <div key={task.id} className="task">
            {task.isChecked && (
              <Task
                task={task}
                onTaskToggle={onTaskToggle}
                onDeleteTask={onDeleteTask}
              />
            )}
          </div>
        ))}
      <Stats
        tasks={tasks}
        onSetView={onSetView}
        onClearCompleted={onClearCompleted}
      />
    </div>
  );
}

function Task({ task, onTaskToggle, onDeleteTask }) {
  return (
    <div className="card">
      <form>
        <div className="checkbox-border">
          <div
            className={task.isChecked ? "checkbox checked" : "checkbox"}
            value={task.isChecked}
            onClick={() => onTaskToggle(task.id)}
          >
            {task.isChecked ? <span>&#10004;</span> : ""}
          </div>
        </div>
      </form>
      <span
        style={
          task.isChecked
            ? { textDecoration: "line-through", color: "#ccc" }
            : {}
        }
      >
        {task.task}
      </span>
      <button
        className="button btn-remove"
        onClick={() => onDeleteTask(task.id)}
      >
        &#x2613;
      </button>
    </div>
  );
}

function Stats({ tasks, onSetView, onClearCompleted }) {
  const numTasks = tasks.length;

  const activeTasks =
    tasks.length > 0 ? tasks.filter((task) => !task.isChecked).length : "No";

  const completedTasks =
    tasks.length > 0 ? tasks.filter((task) => task.isChecked).length : "No";

  return (
    <>
      <div className="stats card">
        <p className="tasks-count">{activeTasks} items left</p>
        <div className="sort-tasks">
          <button
            className="button bold"
            value="all"
            onClick={() => onSetView("all")}
          >
            All
          </button>
          <button
            className="button bold"
            value="active"
            onClick={() => onSetView("active")}
          >
            Active
          </button>
          <button
            className="button bold"
            value="completed"
            onClick={() => onSetView("completed")}
          >
            Completed
          </button>
        </div>
        <button className="button btn-clear" onClick={onClearCompleted}>
          Clear Completed
        </button>
      </div>
      <div className="card sort-tasks-mobile">
        <button
          className="button bold"
          value="all"
          onClick={() => onSetView("all")}
        >
          All
        </button>
        <button
          className="button bold"
          value="active"
          onClick={() => onSetView("active")}
        >
          Active
        </button>
        <button
          className="button bold"
          value="completed"
          onClick={() => onSetView("completed")}
        >
          Completed
        </button>
      </div>
    </>
  );
}
