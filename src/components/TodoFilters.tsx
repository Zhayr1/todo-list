import { FilterTypes } from "../App";
import { Button } from "./Button";

interface Props {
  filter: FilterTypes;
  setFilter: (filter: FilterTypes) => void;
  search: string;
  setSearch: (value: string) => void;
}

export const TodoFilters = ({
  filter,
  setFilter,
  search,
  setSearch,
}: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2 mt-2">
        <Button
          handleClick={() => {
            setFilter("All");
          }}
        >
          All
        </Button>
        <Button
          handleClick={() => {
            setFilter("Active");
          }}
        >
          Active
        </Button>
        <Button
          handleClick={() => {
            setFilter("Completed");
          }}
        >
          Completed
        </Button>
      </div>
      <div className="mt-4">
        <p>Filter: {filter}</p>
        <div className="flex flex-col w-[200px]">
          <label>Search</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-[6px] h-[32px] px-2"
          />
        </div>
      </div>
    </div>
  );
};
