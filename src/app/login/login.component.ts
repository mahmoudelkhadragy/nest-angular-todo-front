import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // redirect user to home page if there is token
    this.apiService.jwtUserToken.subscribe((token) => {
      if (token) {
        this.router.navigateByUrl('/').then();
      }
    });
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    const { username, password } = loginForm.value;
    this.apiService.login(username, password);
    return loginForm.reset();
  }
}
