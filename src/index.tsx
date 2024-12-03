import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useState } from "react";
import { Filter, Todo } from "./types";
import { useLocalStorage } from "@raycast/utils";
import EmptyView from "./components/empty-view";
import CreateTodoAction from "./components/create-todo-action";
import ToggleTodoAction from "./components/toggle-todo-action";
import { DeleteTodoAction } from "./components/delete-todo-action";

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

  const handleCreate = (title: string) => {
    setTodos([
      ...(todos ?? []),
      {
        id: String(+new Date()),
        title,
        isCompleted: false,
      },
    ]);
    setState((prev) => ({
      ...prev,
      filter: Filter.All,
      searchText: "",
    }));
  };

  const filteredTodos = (() => {
    if (state.filter === Filter.Open) {
      return todos?.filter((todo) => !todo.isCompleted) ?? [];
    }
    if (state.filter === Filter.Completed) {
      return todos?.filter((todo) => todo.isCompleted) ?? [];
    }
    return todos ?? [];
  })();

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
      <EmptyView filter={state.filter} todos={filteredTodos} searchText={state.searchText} onCreate={handleCreate} />
      {filteredTodos.map((todo, index) => (
        <List.Item
          key={todo.id}
          icon={todo.isCompleted ? Icon.Checkmark : Icon.Circle}
          title={todo.title}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <ToggleTodoAction
                  todo={todo}
                  onToggle={() =>
                    setTodos(
                      todos?.map((todo, i) => {
                        if (i === index) {
                          return { ...todo, isCompleted: !todo.isCompleted };
                        }
                        return todo;
                      }) ?? [],
                    )
                  }
                />
                <Action.CopyToClipboard content={todo.title} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <CreateTodoAction defaultTitle={state.searchText} onCreate={handleCreate} />
                <DeleteTodoAction onDelete={() => setTodos(todos?.filter((_, i) => i !== index) ?? [])} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
