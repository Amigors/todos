export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export type FilterType = "all" | "active" | "completed";
