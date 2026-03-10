import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { LucideAngularModule, UserRound, LockKeyhole, Eye, EyeOff } from 'lucide-angular';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,

  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

function usernameOrEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    // letters, numbers, underscore, 3-20 chars

    const isEmail = emailRegex.test(value);
    const isUsername = usernameRegex.test(value);

    return isEmail || isUsername ? null : { usernameOrEmail: true };
  };
}
@Component({
  selector: 'app-Login',
  standalone: true,
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
  imports: [LucideAngularModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  router = inject(Router);

  icons = {
    UserRound,
    LockKeyhole,
    Eye,
    EyeOff,
  };

  authService = inject(AuthService);

  constructor() { }

  showPassword = signal<boolean>(false);
  private fb = inject(FormBuilder);
  isLoggedIn = signal(false);
  isLoading = signal(false);
  loginError = signal<string>('');

  togglePassword() {
    this.showPassword.set(true);
  }
  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, usernameOrEmailValidator()]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });

  onSubmit() {
     this.isLoading.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
        
      return;
    }

    this.isLoggedIn.set(false);
    this.loginError.set('');
    

    const { username, password } = this.form.getRawValue();

    this.authService.login(username, password).subscribe({
      next: (res) => {
        localStorage.setItem('accessToken', res.accessToken);
        this.isLoading.set(false);
        this.isLoggedIn.set(true);
        // setTimeout(()=>{ this.isLoggedIn.set(false),9000})

        this.form.reset();
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 500);
      },
      error: (err) => {
        setTimeout(() => {
           this.isLoading.set(false);
          this.loginError.set(err?.error?.message ?? 'Login failed');
        }, 200);
      },
    });
  }



  ngOnInit() { 

  }
}
