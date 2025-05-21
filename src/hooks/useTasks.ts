import { useState } from "react";
import type { FilterType, Task } from "../types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const addTask = () => {
    if (newTaskText.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTaskText,
          completed: false,
        },
      ]);
      setNewTaskText("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // 'all'
  });

  return {
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
  };
};
