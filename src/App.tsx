import { useState } from "react";
import { CreateTodoForm } from "./components/CreateTodoForm";
import { Todo } from "./components/Todo";
import { useTodoStore } from "./store/todo.store";
import { TodoFilters } from "./components/TodoFilters";
import { Toaster } from "react-hot-toast";

export type FilterTypes = "All" | "Active" | "Completed";

function App() {
  const [formValue, setFormValue] = useState("");
  const todos = useTodoStore((state) => state.todos);
  const [filter, setFilter] = useState<FilterTypes>("All");
  const [search, setSearch] = useState("");

  const now = new Date();

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col items-start">
        <CreateTodoForm value={formValue} setValue={setFormValue} />
      </div>
      <TodoFilters
        filter={filter}
        setFilter={(newFilter: FilterTypes) => {
          setFilter(newFilter);
        }}
        search={search}
        setSearch={(value: string) => setSearch(value)}
      />
      <div className="flex flex-col gap-3 mt-2">
        {todos.length > 0 ? (
          todos
            .filter((it) => {
              if (search) {
                if (!it.title.toLowerCase().includes(search.toLowerCase()))
                  return false;
              }

              if (filter === "Active") {
                return !it.completed;
              } else if (filter === "Completed") {
                return it.completed;
              }

              return true;
            })
            .sort((a, b) => {
              const deadlineA = a.deadline ? new Date(a.deadline) : null;
              const deadlineB = b.deadline ? new Date(b.deadline) : null;

              if (deadlineA && deadlineB) {
                return deadlineA.getTime() - deadlineB.getTime();
              } else if (deadlineA && !deadlineB) {
                return -1;
              } else if (!deadlineA && deadlineB) {
                return 1;
              } else {
                return 0;
              }
            })
            .sort((a, b) => {
              const deadlineA = a.deadline ? new Date(a.deadline) : null;
              const deadlineB = b.deadline ? new Date(b.deadline) : null;

              if (deadlineA && deadlineA > now) {
                if (deadlineB && deadlineB > now) {
                  return 0;
                } else {
                  return -1;
                }
              } else if (deadlineB && deadlineB > now) {
                return 1;
              } else if (!deadlineA && !deadlineB) {
                return 0;
              } else if (!deadlineA) {
                return -1;
              } else if (!deadlineB) {
                return 1;
              } else if (deadlineA < now && deadlineB < now) {
                return 0;
              } else if (deadlineA < now) {
                return 1;
              } else if (deadlineB < now) {
                return -1;
              } else {
                return 0;
              }
            })
            .map((item) => {
              return <Todo key={item.id} todo={item} />;
            })
        ) : (
          <p className="text-[22px]">No todos to show</p>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default App;
