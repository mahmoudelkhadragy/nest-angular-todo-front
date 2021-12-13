import { Todo } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

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
    return this.http
      .get(`${this.URL}/todos`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        tap((res) => {
          if (res) {
            this.toast.success('Status updated successfully', '', {
              timeOut: 1000,
            });
          }
        })
      );
  }

  // delete todo
  deleteTodo(todoId: number) {
    return this.http
      .delete(`${this.URL}/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        tap((res) => {
          // @ts-ignore
          if (res.success) {
            this.toast.success('Status deleted successfully');
          }
        })
      );
  }

  // create todo
  createTodo(title: string, description: string) {
    return this.http.post(
      `${this.URL}/todos`,
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  // update status
  updateStatus(statusValue: string, todoId: number) {
    return this.http.patch(
      `${this.URL}/todos/${todoId}`,
      { status: statusValue },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  // login
  login(username: string, password: string) {
    this.http.post(`${this.URL}/auth/login`, { username, password }).subscribe(
      // @ts-ignore
      (res: { token: string }) => {
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
        this.toast.error('Authentication failed, try again', '', {
          timeOut: 1000,
        });
      }
    );
  }

  // logout
  logout() {
    this.token = '';
    this.jwtToken$.next(this.token);
    this.toast
      .success('Logged out successfully', '', {
        timeOut: 500,
      })
      .onHidden.subscribe(() => {
        localStorage.removeItem('act');
        this.router.navigateByUrl('/login').then();
      });
    return '';
  }
}
