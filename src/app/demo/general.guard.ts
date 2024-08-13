import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './components/auth/auth.service';
import { inject } from '@angular/core';








export const generalGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authService = inject(AuthService);
  const isAuthenticated = authService.getUser();

  if(isAuthenticated)
  return true;
  else{
    return router.navigateByUrl('/auth/login')
  }


};

