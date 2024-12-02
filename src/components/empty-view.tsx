import { List } from "@raycast/api";
import { Filter, Todo } from "../types";

interface Props {
  todos: Todo[];
  filter: Filter;
  searchText: string;
  onCreate: (title: string) => void;
}

export default function EmptyView({ todos, filter, searchText, onCreate }: Props) {
  if (todos.length > 0) {
    return <List.EmptyView icon="" />;
  }
}
