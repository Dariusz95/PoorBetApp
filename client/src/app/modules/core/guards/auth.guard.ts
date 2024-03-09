import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';
import { map, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export function authGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return toObservable(authService.loggedIn).pipe(
      map((loggedIn) => {
        console.log('loggedIn', loggedIn);
        if (loggedIn) return true;
        else return router.createUrlTree(['/auth/sign-in']);
      })
    );
  };
}
