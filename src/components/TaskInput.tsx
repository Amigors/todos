import type { TaskInputProps } from "../types";

const TaskInput: React.FC<TaskInputProps> = ({ value, onChange, onAdd }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder="Что должно быть сделано?"
      />
      <button onClick={onAdd}>Добавить</button>
    </div>
  );
};

export default TaskInput;
