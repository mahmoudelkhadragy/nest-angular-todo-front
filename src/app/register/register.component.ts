import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  register(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }
    const { username, password } = registerForm.value;
    // this.apiService.
    this.apiService.register(username, password).subscribe((res) => {
      // @ts-ignore
      if (res?.status == 400) {
        this.toast.error('username is exist before', '', {
          timeOut: 1000,
        });
      } else {
        this.toast.success('registered successfully', '', {
          timeOut: 1000,
        });
        this.router.navigateByUrl('/').then();
      }
    });
  }
}
