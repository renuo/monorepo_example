import { Component, OnInit } from '@angular/core';
import { TodoDataService } from './services/todo-data.service';
import { TodoItem } from './models/todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent implements OnInit {
  todos: TodoItem[];
  newTodo: TodoItem = new TodoItem();

  constructor(private todoDataService: TodoDataService) {
    this.todos = [];
  }

  ngOnInit(): void {
    this.todoDataService.index().subscribe(todos => {
      console.log('received todos', todos);
      this.todos = todos;
    });
  }

  addTodo() {
    this.todoDataService.create(this.newTodo).subscribe(
      success => {
          this.todos.push(TodoItem.deserialize(success.json()));
      },
      error => {
        console.log('error');
        console.log(error.json());
      }
    );
    this.newTodo = new TodoItem();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggle(todo).subscribe(
      success => {
        todo.completed = !todo.completed;
      }
    );
  }

  removeTodo(todo) {
    this.todoDataService.destroy(todo.id).subscribe(
      success => {
        this.todos = this.todos.filter(t => t.id !== todo.id);
      }
    );
  }
}
