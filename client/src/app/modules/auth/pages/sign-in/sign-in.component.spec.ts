import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { AuthService } from '@auth/service/auth.service';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '@shared/components/app-button/app-button.component';
import { LoginForm } from '@auth/models/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/angular';

describe('SignUpComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;

  const correctEmail = 'test@test.pl';
  const correctPassword = '123';

  const authServiceMock = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignInComponent,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ButtonComponent,
        HttpClientTestingModule,
      ],
      providers: [
        UntypedFormBuilder,
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    emailInput = fixture.debugElement.nativeElement.querySelector('#email');
    passwordInput =
      fixture.debugElement.nativeElement.querySelector('#password');
  });

  function updateForm(userEmail: string, userPassword: string) {
    component.signUpForm.controls['email'].setValue(userEmail);
    component.signUpForm.controls['password'].setValue(userPassword);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.signUpForm).toBeDefined();
    expect(component.signUpForm.invalid).toBeTruthy();
  });

  it('Form invalid should be true when form is invalid', () => {
    updateForm('test.pl', '123');
    expect(component.signUpForm.invalid).toBeTruthy();
  });

  it('should call AuthService.login when clickHandler is called', async () => {
    updateForm(correctEmail, correctPassword);

    authServiceMock.login.mockReturnValue(of({ access_token: 'token_test' }));

    component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith(
      component.signUpForm.value
    );
  });

  it('should render the form and handle form submission', async () => {
    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);

    userEvent.click(screen.getByText('Zaloguj się'));

    expect(authServiceMock.login).toHaveBeenCalledWith({
      email: correctEmail,
      password: correctPassword,
    });
  });
});
