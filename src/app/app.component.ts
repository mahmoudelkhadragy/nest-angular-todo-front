import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLogedIn = false;
  username = '';
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.jwtUserToken.subscribe((token) => {
      if (token) {
        const decoded: any = jwtDecode(token);
        this.username = decoded.username;
      }
      if (this.username) {
        this.isLogedIn = true;
      } else {
        this.isLogedIn = false;
      }
    });
  }

  // logout method
  logout() {
    this.username = '';
    this.apiService.logout();
  }
}
