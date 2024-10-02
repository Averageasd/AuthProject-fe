import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticatedResponse, LoginModel } from '../interfaces/login.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css',
})
export class LoginComponentComponent implements OnInit {
  invalidLogin: boolean = false;
  credentials: LoginModel = { name: '', password: '' };

  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {}

  login(form: NgForm): void {
    if (form.valid) {
      this.http
        .post<AuthenticatedResponse>(
          'https://localhost:7226/api/auth/login',
          this.credentials,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          }
        )
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            const token = response.token;
            const refreshToken = response.refreshToken;
            localStorage.setItem('jwt', token);
            localStorage.setItem('refreshToken', refreshToken);
            this.invalidLogin = false;
            this.router.navigate(["/"]);
          },
          error: (err: HttpErrorResponse) => (this.invalidLogin = true),
        });
    }
  }
}
