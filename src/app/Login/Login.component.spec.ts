import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LoginComponent } from './Login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;

  const mockAuthService = {
    login: vi.fn(),
  };

  const mockRouter = {
    navigate: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent], // standalone component
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        FormBuilder,
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize signals correctly', () => {
    expect(component.showPassword()).toBe(false);
    expect(component.isLoggedIn()).toBe(false);
    expect(component.isLoading()).toBe(false);
    expect(component.loginError()).toBe('');
  });

  it('should toggle showPassword signal', () => {
    component.togglePassword();
    expect(component.showPassword()).toBe(true);
  });

  it('should invalidate form with incorrect username', () => {
    component.form.controls['username'].setValue('@@invalid');
    component.form.controls['password'].setValue('123456');
    expect(component.form.valid).toBe(false);
  });

  it('should validate form with correct username/email and password', () => {
    component.form.controls['username'].setValue('test_user');
    component.form.controls['password'].setValue('123456');
    expect(component.form.valid).toBe(true);
  });

  it('should handle successful login', async () => {
    const loginResponse = { accessToken: 'mockToken' };
    mockAuthService.login.mockReturnValue(of(loginResponse));

    component.form.controls['username'].setValue('test_user');
    component.form.controls['password'].setValue('123456');

    component.onSubmit();

    // Wait for async code (setTimeout in navigate)
    await new Promise((r) => setTimeout(r, 500));

    expect(localStorage.getItem('accessToken')).toBe('mockToken');
    expect(component.isLoading()).toBe(false);
    expect(component.isLoggedIn()).toBe(true);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login error', async () => {
    mockAuthService.login.mockReturnValue(
      throwError(() => ({ error: { message: 'Invalid credentials' } }))
    );

    component.form.controls['username'].setValue('test_user');
    component.form.controls['password'].setValue('123456');

    component.onSubmit();

    await new Promise((r) => setTimeout(r, 200)); // wait for error setTimeout

    expect(component.isLoading()).toBe(false);
    expect(component.loginError()).toBe('Invalid credentials');
  });
});