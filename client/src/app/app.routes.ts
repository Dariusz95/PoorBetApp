import { Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/pages/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './modules/home/home/home.component';
import { BetComponent } from './modules/bet/pages/bet/bet.component';
import { authnGuard } from './modules/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
    ],
  },
  {
    path: 'app',
    canActivateChild: [authnGuard()],
    children: [
      {
        path: 'bet',
        component: BetComponent,
      },
    ],
  },
];
