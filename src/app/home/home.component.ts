import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todos: any[] = [];
  filteredTodos: any[] = [
    { title: 'test', description: 'test description', status: 'OPEN' },
    { title: 'develop', description: 'develop description', status: 'OPEN' },
  ];
  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  filterChanged(e: MatSelectChange) {
    const value = e.value;
    this.filteredTodos = this.filteredTodos;
  }

  deleteTodo(e: Event) {
    e.stopPropagation();
    console.log('ffff');
  }
}
