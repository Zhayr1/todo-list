import { create } from "zustand";
import { ITodo } from "../components/Todo";
import * as uuid from "uuid";

interface TodoStoreState {
  todos: ITodo[];
  addTodo: (title: string, deadline: string) => void;
  removeTodo: (id: string) => void;
  setCompleted: (id: string) => void;
}

export const useTodoStore = create<TodoStoreState>((set) => ({
  todos: [],
  addTodo: (title, deadline) =>
    set((state) => ({
      ...state,
      todos: [
        ...state.todos,
        { id: uuid.v4(), title, completed: false, deadline },
      ],
    })),
  setCompleted: (id) =>
    set((state) => ({
      ...state,
      todos: state.todos.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      }),
    })),
  removeTodo: (id) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter((it) => it.id !== id),
    })),
}));
