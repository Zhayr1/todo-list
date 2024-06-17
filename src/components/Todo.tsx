import { CalendarDots, CheckCircle, Trash } from "@phosphor-icons/react";
import { useTodoStore } from "../store/todo.store";

import dayjs from "dayjs";

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  deadline?: string;
}

interface TodoProps {
  todo: ITodo;
}

export const Todo = ({ todo }: TodoProps) => {
  const { completed, id, title } = todo;

  const removeTodo = useTodoStore((state) => state.removeTodo);
  const setCompleted = useTodoStore((state) => state.setCompleted);

  return (
    <div
      className="card bg-gray-100 rounded-[6px] w-full md:w-[350px] p-4"
      key={id}
    >
      <div className="flex items-center">
        <div className="flex-1">
          <p className={`flex-1 ${completed && "line-through"}`}>{title}</p>
          {todo.deadline ? (
            <div
              className={`flex items-center mt-2 gap-1 ${
                new Date(todo.deadline) > new Date()
                  ? "text-green-500"
                  : "text-red-500 line-through"
              }`}
            >
              <CalendarDots size={18} />
              <p className="text-[12px] flex">
                {dayjs(new Date(todo.deadline)).format("DD-MM-YY")}
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <button>
            <CheckCircle
              size={32}
              className={`${completed ? "text-gray-500" : "text-green-500"}`}
              onClick={() => setCompleted(id)}
            />
          </button>
          <button>
            <Trash
              size={32}
              className="text-red-500"
              onClick={() => {
                removeTodo(id);
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
