import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { CreateUserForm, LoginForm, LoginPayloadData } from '../models/auth';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';
import { CustomJwtPayload } from '../../shared/jwtPayload';
import { accessToken } from '@shared/models/token';
import { environment } from '@environment/environment.dev';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _httpClient: HttpClient) {
    if (this.token) this.loggedIn.set(true);
  }

  // loggedIn: WritableSignal<boolean> = signal(false);

  loggedIn = signal(false);
  // loggedIn = computed(() => this.token);

  baseUrl = environment.baseUrl;
  private _user!: User;

  get user() {
    return this._user;
  }

  login(loginForm: LoginForm): Observable<LoginPayloadData> {
    return this._httpClient
      .post<LoginPayloadData>(`${this.baseUrl}/auth/login`, {
        ...loginForm,
      })
      .pipe(
        tap((data) => {
          this.setSession(data.access_token);
        })
      );
  }

  createUser(signInForm: CreateUserForm) {
    return this._httpClient.post<any>(`${this.baseUrl}/auth`, {
      ...signInForm,
    });
  }

  private setSession(token: string) {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    console.log(decoded);
    const { username, sub, email } = decoded;
    const userId = sub;
    if (username && userId && email) {
      this.setUserData({ username, userId, email });
      localStorage.setItem(accessToken, token);
      this.loggedIn.set(true);
    }
  }

  setUserData(userData: User) {
    this._user = userData;
  }

  get token() {
    return localStorage.getItem(accessToken);
  }

  logout() {
    localStorage.removeItem(accessToken);
    this.loggedIn.set(false);
    this.setUserData({} as User);
  }
}
