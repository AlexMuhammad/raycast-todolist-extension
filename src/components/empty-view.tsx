import { ActionPanel, List } from "@raycast/api";
import { Filter, Todo } from "../types";
import CreateTodoAction from "./create-todo-action";

interface Props {
  todos: Todo[];
  filter: Filter;
  searchText: string;
  onCreate: (title: string) => void;
}

export default function EmptyView({ todos, filter, searchText, onCreate }: Props) {
  if (todos.length > 0) {
    return (
      <List.EmptyView
        icon="😕"
        title="No matching todos found"
        description={`Can't find a todo matching ${searchText}.\nCreate it now`}
        actions={
          <ActionPanel>
            <CreateTodoAction defaultTitle={searchText} onCreate={onCreate} />
          </ActionPanel>
        }
      />
    );
  }
  switch (filter) {
    case Filter.Open:
      return (
        <List.EmptyView
          icon="🎉"
          title="All done"
          description="All todos completed - way to go! Why not create some more?"
          actions={
            <ActionPanel>
              <CreateTodoAction defaultTitle={searchText} onCreate={onCreate} />
            </ActionPanel>
          }
        />
      );
    case Filter.Completed:
      return (
        <List.EmptyView
          icon="😢"
          title="No todos completed"
          description="Uh-oh, looks like you haven't completed any todos yet."
        />
      );
    case Filter.All:
    default: {
      return (
        <List.EmptyView
          icon="📝"
          title="No todos found"
          description="You don't have any todos yet. Why not add some?"
          actions={
            <ActionPanel>
              <CreateTodoAction defaultTitle={searchText} onCreate={onCreate} />
            </ActionPanel>
          }
        />
      );
    }
  }
}
