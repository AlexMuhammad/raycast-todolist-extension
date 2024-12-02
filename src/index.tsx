import { List } from "@raycast/api";
import { useState } from "react";
import { Filter, Todo } from "./types";
import { useLocalStorage } from "@raycast/utils";

type State = {
  filter: Filter;
  searchText: string;
};

export default function Command() {
  const [state, setState] = useState<State>({
    filter: Filter.All,
    searchText: "",
  });
  const { value: todos, setValue: setTodos, isLoading } = useLocalStorage<Todo[]>("todos");
  return (
    <List
      isLoading={isLoading}
      searchText={state.searchText}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select Todo List"
          value={state.filter}
          onChange={(newValue) =>
            setState((prev) => ({
              ...prev,
              filter: newValue as Filter,
            }))
          }
        >
          <List.Dropdown.Item title="All" value={Filter.All} />
          <List.Dropdown.Item title="Open" value={Filter.Open} />
          <List.Dropdown.Item title="Completed" value={Filter.Completed} />
        </List.Dropdown>
      }
      filtering
      onSearchTextChange={(newValue) => setState((prev) => ({ ...prev, searchText: newValue }))}
    >
      {todos?.map((todo, index) => <List.Item key={index} title={todo.title}></List.Item>)}
    </List>
  );
}
