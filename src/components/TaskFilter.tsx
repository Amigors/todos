import type { TaskFilterProps } from "../types";

const TaskFilter: React.FC<TaskFilterProps> = ({
  currentFilter,
  setFilter,
}) => {
  return (
    <div className="task-filter">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        Все
      </button>
      <button
        className={currentFilter === "active" ? "active" : ""}
        onClick={() => setFilter("active")}
      >
        Активные
      </button>
      <button
        className={currentFilter === "completed" ? "active" : ""}
        onClick={() => setFilter("completed")}
      >
        Выполненные
      </button>
    </div>
  );
};

export default TaskFilter;
