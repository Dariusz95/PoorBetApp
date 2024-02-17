import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '@shared/components/app-button/app-button.component';
import { AuthService } from '@auth/service/auth.service';
import { CreateUserForm } from '@auth/models/auth';
import {
  confirmPasswordValidator,
  patternValidator,
} from '@auth/validators/passwordValidators';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ButtonComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}
  signUpForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  hidePassword = true;
  hideConfirmPassword = true;

  initForm() {
    this.signUpForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          patternValidator(new RegExp('(?=.*[0-9])'), {
            requiresDigit: true,
          }),
          patternValidator(new RegExp('(?=.*[A-Z])'), {
            requiresUppercase: true,
          }),
          patternValidator(new RegExp('(?=.*[a-z])'), {
            requiresLowercase: true,
          }),
          patternValidator(new RegExp('(?=.*[$@^!%*?&])'), {
            requiresSpecialChars: true,
          }),
        ],
      ],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
    });
  }

  register() {
    const createUserForm: CreateUserForm = this.signUpForm.value;
    this._authService.createUser(createUserForm).subscribe();
  }

  passwordValidators = [
    {
      validator: 'minlength',
      message: 'Hasło musi zawierać przynajmniej 6 znaków',
    },
    { validator: 'requiresDigit', message: 'Hasło musi zawierać cyfrę' },
    {
      validator: 'requiresUppercase',
      message: 'Hasło musi zawierać dużą literę',
    },
    {
      validator: 'requiresLowercase',
      message: 'Hasło musi zawierać małą literę',
    },
    {
      validator: 'requiresSpecialChars',
      message: 'Hasło musi zawierać specjalny znak (@^!%*?&)',
    },
  ];

  get minLengthValid() {
    return !this.signUpForm.get('password')?.hasError('minlength');
  }

  get requiresDigitValid() {
    return !this.signUpForm.get('password')?.hasError('requiresDigit');
  }

  get requiresUppercaseValid() {
    return !this.signUpForm.get('password')?.hasError('requiresUppercase');
  }

  get requiresLowercaseValid() {
    return !this.signUpForm.get('password')?.hasError('requiresLowercase');
  }

  get requiresSpecialCharsValid() {
    return !this.signUpForm.get('password')?.hasError('requiresSpecialChars');
  }
}
