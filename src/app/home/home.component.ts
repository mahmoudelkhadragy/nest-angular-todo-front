import { ConfirmDeleteDialogComponent } from './../confirm-delete-dialog/confirm-delete-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Todo } from '../models/todo.model';
import { ApiService } from '../services/api.service';
import { TodoComponent } from '../todo/todo.component';

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

  ngOnInit(): void {
    // get all todos from api in the beginning
    this.getAllTodosFromAPI();
  }

  openPopup() {
    const dialogRef: MatDialogRef<TodoComponent> = this.dialog.open(
      TodoComponent,
      {
        width: '500px',
        hasBackdrop: true,
        role: 'dialog',
      }
    );

    dialogRef.afterClosed().subscribe((data) => {
      this.apiService
        .createTodo(data.title, data.description)
        .subscribe((res: any) => {
          console.log(res);
          this.todos.push(res);
          this.filteredTodos = this.todos;
        });
    });
  }

  // get all todos from api
  getAllTodosFromAPI() {
    this.apiService.getAllTodos().subscribe((todos) => {
      this.todos = todos;
      this.filteredTodos = todos;
    });
  }

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

  statusChanged(value: string, todoId: number, index: number) {
    const newValue = value;
    this.apiService.updateStatus(newValue, todoId).subscribe((todo) => {
      // @ts-ignore
      this.todos[index] = todo;
      this.filteredTodos = this.todos;
    });
  }

  deleteTodo(e: Event, todoId: number) {
    e.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteTodo(todoId).subscribe((res) => {
          // @ts-ignore
          if (res.success) {
            this.todos = this.todos.filter((todo) => todo.id !== todoId);
            this.filteredTodos = this.todos;
          }
        });
      }
    });
  }
}
