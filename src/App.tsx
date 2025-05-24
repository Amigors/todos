import { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";
import TaskFilter from "./components/TaskFilter";
import { useTasks } from "./contexts/TaskContext";

const App: React.FC = () => {
  const {
    tasks,
    filteredTasks,
    activeTasks,
    filter,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    setFilter,
  } = useTasks();

  const [newTaskText, setNewTaskText] = useState("");

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      addTask(newTaskText.trim());
      setNewTaskText("");
    }
  };

  return (
    <div className="app">
      <h1>ToDo App</h1>
      <TaskInput
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        onAdd={handleAddTask}
      />

      {tasks.length > 0 && (
        <>
          <TaskFilter currentFilter={filter} setFilter={setFilter} />

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

          <div className="stats">
            <span className="remain-count">Осталось: {activeTasks.length}</span>
            <button onClick={clearCompleted} className="clear-completed-btn">
              Удалить выполненные
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
