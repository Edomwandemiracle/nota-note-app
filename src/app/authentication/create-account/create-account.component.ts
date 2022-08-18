import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  createAccountForm!: FormGroup;
  user!: User;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initcreateAccountForm();
  }

  initcreateAccountForm() {
    this.createAccountForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
    this.user = {
      id: Math.floor(Math.random() * 1000),
      firstName: this.createAccountForm.value.first_name,
      lastName: this.createAccountForm.value.last_name,
      email: this.createAccountForm.value.email,
      password: this.createAccountForm.value.password,
    };
    this.authService.createUser(this.user);
  }
}
