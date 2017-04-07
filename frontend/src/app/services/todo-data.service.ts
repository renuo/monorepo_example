import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class TodoDataService {
  endpoint = 'http://localhost:5000/todos';

  constructor(private http: Http) {
  }

  headers() {
    return {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
  }

  create(todoItem: TodoItem): Observable<Response> {
    return this.http.post(this.endpoint, JSON.stringify({ todo: todoItem}), this.headers())
  }

  destroy(id: number): Observable<Response> {
    return this.http.delete(`${this.endpoint}/${id}`, this.headers());
  }

  update(id: number, values: Object = {}): Observable<Response> {
    return this.http.patch(`${this.endpoint}/${id}`,JSON.stringify({ todo: values}), this.headers());
  }

  index(): Observable<TodoItem[]> {
    return this.http.get(this.endpoint, this.headers()).map(
      data => {
        console.log(data.json());
        return data.json().map(todoItemData => {
          return TodoItem.deserialize(todoItemData);
        });
      },
      error => {

      }
    );
  }

  toggle(todo: TodoItem): Observable<Response> {
    return this.update(todo.id, {completed: !todo.completed});
  }
}
