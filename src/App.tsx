import React from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";
import "./App.css";
import TaskFilter from "./components/TaskFilter";

const App: React.FC = () => {
  const {
    tasks,
    newTaskText,
    setNewTaskText,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    filter,
    setFilter,
    filteredTasks,
  } = useTasks();

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="app">
      <h1>todos</h1>
      <TaskInput
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        onAdd={addTask}
      />

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        title={
          filter === "all"
            ? "Все задачи"
            : filter === "active"
            ? "Активные задачи"
            : "Завершенные задачи"
        }
      />

      {tasks.length > 0 && (
        <div className="stats">
          <span className="remain-count">осталось: {activeTasks.length}</span>
          <TaskFilter currentFilter={filter} setFilter={setFilter} />
          <button onClick={clearCompleted} className="clear-completed-btn">
            Удалить выполненные
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
