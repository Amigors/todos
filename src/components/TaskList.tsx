import React from "react";
import TaskItem from "./TaskItem";
import type { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  title: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
  title,
}) => {
  if (tasks.length === 0) return null;

  return (
    <div className="task-list">
      <h3>{title}</h3>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
