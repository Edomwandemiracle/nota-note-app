import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  currentUser: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.currentUser = this.authService.getLoggedInUser();
  }

  logOut() {
    if (localStorage.getItem('loggedInUser')) {
      localStorage.removeItem('loggedInUser');
      this.router.navigate(['']);
    }
  }
}
