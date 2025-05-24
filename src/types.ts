// Базовые типы
export type Task = {
  id: number;
  text: string;
  completed: boolean;
  createdAt?: string; // Добавлено как опциональное поле для будущего использования
  updatedAt?: string; // Опциональное поле для отслеживания изменений
};

export type FilterType = "all" | "active" | "completed";

// Вспомогательные типы для пропсов компонентов
type TaskActionHandlers = {
  onToggle: (id: Task["id"]) => void;
  onDelete: (id: Task["id"]) => void;
};

// Типы для контекста
export type TaskContextType = {
  tasks: Task[];
  filteredTasks: Task[];
  activeTasks: Task[];
  completedTasks: Task[];
  filter: FilterType;
  addTask: (text: string) => void;
  toggleTask: TaskActionHandlers["onToggle"];
  deleteTask: TaskActionHandlers["onDelete"];
  clearCompleted: () => void;
  setFilter: (filter: FilterType) => void;
  updateTaskText: (id: Task["id"], newText: string) => void;
};

// Типы для компонентов
export type TaskFilterProps = {
  currentFilter: FilterType;
  setFilter: TaskContextType["setFilter"];
  className?: string; // Для стилизации
};

export type TaskInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

export type TaskItemProps = TaskActionHandlers & {
  task: Task;
  onEdit?: (id: Task["id"], newText: string) => void; // Для будущего функционала редактирования
  className?: string;
};

export type TaskListProps = TaskActionHandlers & {
  tasks: Task[];
  title: string;
  emptyState?: React.ReactNode; // Компонент для пустого состояния
  className?: string;
};

// Утилитарные типы
export type TaskStatus = "completed" | "active";
export type TaskSortField = "createdAt" | "updatedAt" | "text";
