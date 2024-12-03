import { Action, Icon } from "@raycast/api";
import CreateTodoForm from "./create-todo-form";

interface Props {
  defaultTitle: string;
  onCreate: (title: string) => void;
}

export default function CreateTodoAction({ defaultTitle, onCreate }: Props) {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Create Todo"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<CreateTodoForm defaultTitle={defaultTitle} onCreate={onCreate} />}
    />
  );
}
