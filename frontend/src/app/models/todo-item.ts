export class TodoItem {
  id: number;
  content: string;
  completed: boolean;

  static deserialize(data): TodoItem {
    const todoItem = new TodoItem();
    todoItem.id = data.id;
    todoItem.completed = data.completed;
    todoItem.content = data.content;
    return todoItem;
  }
}
