import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Todo } from '../models/todo.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: any[] = [
    { title: 'test', description: 'test description', status: 'OPEN' },
    { title: 'develop', description: 'develop description', status: 'OPEN' },
  ];
  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  filterChanged(e: MatSelectChange) {
    const value = e.value;
    this.filteredTodos = this.filteredTodos;
    if (value) {
      this.filteredTodos = this.filteredTodos.filter(
        (todo: Todo) => todo.status === value
      );
    } else {
      this.filteredTodos = this.todos;
    }
  }

  statusChanged(value: string, todoId: number, i: number) {
    console.log(value, todoId, i);
    console.log(typeof value, typeof todoId, typeof i);
  }

  deleteTodo(e: Event) {
    e.stopPropagation();
  }
}
