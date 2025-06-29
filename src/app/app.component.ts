import { Component, OnInit } from '@angular/core';
import { Task } from './models/task.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test';
  tasks: Task[] = [];
  taskName: String = '';
  dueDate: string = '';
  addTask(): void {
    console.log("Hello world");
    if (this.taskName.trim() && this.dueDate.trim()) {
      const newTask: Task = {
        id: Date.now(),
        name: this.taskName.trim(),
        completed: false,
        date: this.dueDate,
      };

      this.tasks.push(newTask);
      this.saveTasks();

      this.taskName = '';
      this.dueDate = '';
    }
  }
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id != id)
    this.saveTasks();
  }

  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  ngOnInit(): void {
    const local = localStorage.getItem('tasks');

    if (local) {
      this.tasks = JSON.parse(local);
    }
  }
}
