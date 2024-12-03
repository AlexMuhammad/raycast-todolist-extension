import { Action, Icon } from "@raycast/api";
import { Todo } from "../types";

interface Props {
  todo: Todo;
  onToggle: () => void;
}

export default function ToggleTodoAction({ todo, onToggle }: Props) {
  return (
    <Action
      icon={todo.isCompleted ? Icon.Circle : Icon.Checkmark}
      title={todo.isCompleted ? "Mark as Uncompleted" : "Mark as Completed"}
      onAction={onToggle}
    />
  );
}
