import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
} from '@angular/forms';
import { AuthService } from '@auth/service/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '@shared/components/app-button/app-button.component';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  let usernameInput: HTMLElement;
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let confirmPasswordInput: HTMLElement;

  const authServiceMock = {
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignUpComponent,
        NoopAnimationsModule,
        HttpClientTestingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ButtonComponent,
      ],
      providers: [
        UntypedFormBuilder,
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    usernameInput = fixture.debugElement.nativeElement.querySelector('#email');
    emailInput = fixture.debugElement.nativeElement.querySelector('#email');
    passwordInput =
      fixture.debugElement.nativeElement.querySelector('#password');
    confirmPasswordInput =
      fixture.debugElement.nativeElement.querySelector('#confirm-password');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the sign-up component', () => {
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it('should call AuthService.createUser when register is called', () => {
    const createUserForm = {
      username: 'testuser',
      email: 'test@test.pl',
      password: 'testpassword',
      confirmPassword: 'testpassword',
    };

    authServiceMock.createUser.mockReturnValue(of());

    component.initForm();
    component.signUpForm.setValue(createUserForm);
    component.register();

    expect(authServiceMock.createUser).toHaveBeenCalledWith(createUserForm);
  });

  it('should valid username', async () => {
    let username = component.signUpForm.controls['username'];

    fixture.detectChanges();

    username.setValue('');
    expect(username.hasError('required')).toBeTruthy();

    username.setValue('dan');
    expect(username.hasError('required')).toBeFalsy();
    expect(username?.hasError('minlength')).toBeTruthy();
  });

  it('should valid email', async () => {
    let email = component.signUpForm.controls['email'];

    fixture.detectChanges();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('dan');
    expect(email.hasError('required')).toBeFalsy();
    expect(email?.hasError('email')).toBeTruthy();
  });
});
