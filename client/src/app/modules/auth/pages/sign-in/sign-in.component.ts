import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth.service';
import { LoginForm } from '../../models/auth';
import { ButtonComponent } from '@shared/components/app-button/app-button.component';
import { passwordValidator } from '@auth/validators/passwordValidators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ButtonComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}
  signUpForm!: UntypedFormGroup;
  ngOnInit(): void {
    this.initForm();
    this.fastLogin();
  }

  //temp
  fastLogin() {
    this.signUpForm.patchValue({
      email: 'nowy123@gmail.com',
      password: 'Nowy123!',
    });
  }

  hide = true;

  initForm() {
    this.signUpForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
    });
  }

  login() {
    const loginForm: LoginForm = this.signUpForm.value;
    this._authService.login(loginForm).subscribe(() => {
      this._router.navigate(['/']);
    });
  }
}
