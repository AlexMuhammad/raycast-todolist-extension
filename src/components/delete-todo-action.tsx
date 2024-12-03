import { Action, Icon } from "@raycast/api";

interface Props {
  onDelete: () => void;
}

export function DeleteTodoAction({ onDelete }: Props) {
  return (
    <Action
      icon={Icon.Trash}
      title="Delete Todo"
      style={Action.Style.Destructive}
      shortcut={{ modifiers: ["ctrl"], key: "x" }}
      onAction={onDelete}
    />
  );
}
