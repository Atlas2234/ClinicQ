import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./nav/nav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  http = inject(HttpClient);
  protected title = 'Client';
  public users: any;

  ngOnInit(): void {
    this.http.get('https://my.api.mockaroo.com/employees?key=b06ce4d0').subscribe({
      next: (data) => {
        this.users = signal(data);
        console.log('Response from server:', data);
      }
      , error: (error) => {
        console.error('Error fetching data from server:', error);
      }
      , complete: () => {
        console.log('Request completed');
      }
    })
  }
}
