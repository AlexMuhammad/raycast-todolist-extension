import { Action, ActionPanel, Form, showToast, Toast, useNavigation } from "@raycast/api";
import { FormValidation, useForm } from "@raycast/utils";

interface Props {
  defaultTitle: string;
  onCreate: (title: string) => void;
}

interface TodoFormValue {
  todo: string;
}

export default function CreateTodoForm({ defaultTitle, onCreate }: Props) {
  const { pop } = useNavigation();
  const { handleSubmit, itemProps } = useForm<TodoFormValue>({
    onSubmit(values) {
      showToast({
        style: Toast.Style.Success,
        title: "Yessir!",
        message: `${values.todo} created!`,
      });
      if (values.todo) {
        onCreate(values.todo);
        pop();
      }
    },
    validation: {
      todo: FormValidation.Required,
    },
  });
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Todo" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField placeholder="Enter Todo Here" defaultValue={defaultTitle} title="Title" {...itemProps.todo} />
    </Form>
  );
}
