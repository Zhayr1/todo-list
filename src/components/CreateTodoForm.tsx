import { useState } from "react";
import { useTodoStore } from "../store/todo.store";
import { Button } from "./Button";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export const CreateTodoForm = ({ value, setValue }: Props) => {
  const addTodo = useTodoStore((state) => state.addTodo);

  const [deadline, setDeadline] = useState<string>("");

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end gap-2">
        <div className="flex flex-col">
          <label>Todo</label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border border-gray-300 rounded-[6px] h-[32px] px-2"
            placeholder="Type your todo..."
          />
        </div>
        <div className="flex flex-col">
          <label>Deadline</label>
          <input
            value={deadline}
            type="date"
            onChange={(e) => setDeadline(e.target.value)}
            className="border border-gray-300 rounded-[6px] h-[32px] px-2"
          />
        </div>
        <Button
          handleClick={() => {
            if (value && value.length > 0) {
              addTodo(value, deadline);
              setValue("");
              setDeadline("");
            }
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
