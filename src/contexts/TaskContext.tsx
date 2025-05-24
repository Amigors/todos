import { createContext, useContext, useState, useMemo, useEffect } from "react";
import type { Task, FilterType, TaskContextType } from "../types";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const activeTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return activeTasks;
      case "completed":
        return completedTasks;
      default:
        return tasks;
    }
  }, [tasks, filter, activeTasks, completedTasks]);

  const addTask = (text: string) => {
    const trimmedText = text.trim();
    if (trimmedText) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: trimmedText,
          completed: false,
        },
      ]);
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
    setTasks(activeTasks);
  };

  const updateTaskText = (id: number, newText: string) => {
    const trimmedText = newText.trim();
    if (trimmedText) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: trimmedText } : task
        )
      );
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        activeTasks,
        completedTasks,
        filter,
        addTask,
        toggleTask,
        deleteTask,
        clearCompleted,
        setFilter,
        updateTaskText,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export { TaskProvider, useTasks };
