import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  title = '';
  description = '';

  constructor(
    public dialogRef: MatDialogRef<TodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onCancel() {
    this.dialogRef.close();
  }
  create() {
    this.dialogRef.close({ title: this.title, description: this.description });
  }
}
