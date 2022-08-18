import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  createUser(user: User) {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([user]));
      this.router.navigate(['']);
    } else {
      const users = JSON.parse(localStorage.getItem('users') as string);
      const exitingUser = users.find(
        (userFromDb: User) => userFromDb.email === user.email
      );
      if (!exitingUser) {
        localStorage.setItem('users', JSON.stringify([...users, user]));
        this.router.navigate(['']);
      } else {
        window.alert('User already exists. Kindly login');
      }
    }
  }

  login(email: string, password: string) {
    if (!localStorage.getItem('users')) {
      return window.alert('User not found. Kindly sign up');
    }
    const users = JSON.parse(localStorage.getItem('users') as string);
    const exitingUser = users.find(
      (userFromDb: User) =>
        userFromDb.email === email && userFromDb.password === password
    );
    if (exitingUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(exitingUser));
      this.router.navigate(['nota/note']);
    } else {
      window.alert('Incorrect password and Email');
    }
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser') as string);
  }
}
