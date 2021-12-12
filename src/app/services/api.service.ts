import { Todo } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token = '';
  jwtToken$: BehaviorSubject<string> = new BehaviorSubject<string>(this.token);
  private URL = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
    const fetchedToken = localStorage.getItem('act');
    if (fetchedToken) {
      this.token = atob(fetchedToken);
      this.jwtToken$.next(this.token);
    }
  }

  get jwtUserToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }

  // get all todos
  getAllTodos(): Observable<any> {
    return this.http.get(`${this.URL}/todos`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  // login
  login(username: string, password: string) {
    this.http
      .post<{ token: string }>(`${this.URL}/login`, { username, password })
      .subscribe(
        (res) => {
          this.token = res.token;
          if (this.token) {
            this.toast
              .success('Login successfully, redirect now', '', {
                timeOut: 700,
                positionClass: 'toast-top-right',
              })
              .onHidden.toPromise()
              .then(() => {
                this.jwtToken$.next(this.token);
                localStorage.setItem('act', btoa(this.token));
                this.router.navigateByUrl('/').then();
              });
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
  }
}
