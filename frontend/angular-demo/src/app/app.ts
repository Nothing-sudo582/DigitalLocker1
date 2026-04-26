import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  files: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log("Angular started");

    this.http.get('http://localhost:5000/files')
      .subscribe({
        next: (data: any) => {
          console.log("DATA RECEIVED:", data);
          this.files = data;
        },
        error: (err) => {
          console.error("ERROR:", err);
        }
      });
  }
}