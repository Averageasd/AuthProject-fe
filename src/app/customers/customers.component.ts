import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tokenGetter } from '../app.module';

@Component({
  selector: 'app-customers-component',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponentComponent implements OnInit {
  secretInfo: any;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${(tokenGetter())}`)
    }
    this.http.get('https://localhost:7226/api/GetInfo', header).subscribe({
      next: (result: any) => {
        this.secretInfo = result.secretInfo;
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }
}
