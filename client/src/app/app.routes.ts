import { Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/pages/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/pages/sign-up/sign-up.component';
import { BetComponent } from './modules/bet/pages/bet/bet.component';

export const routes: Routes = [
  {
    path: '',
    component: BetComponent,
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
  // {
  //   path: 'app',
  //   canActivateChild: [authGuard()],
  //   children: [
  //     {
  //       path: 'bet',
  //       component: BetComponent,
  //     },
  //   ],
  // },
];
