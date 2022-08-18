import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
