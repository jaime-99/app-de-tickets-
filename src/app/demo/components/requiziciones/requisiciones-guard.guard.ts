import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';



export const requisicionesGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const authService = inject(AuthService);
  const isAuthenticated = authService.getUser();

  
  if(isAuthenticated.tipoId !==1)
    return router.navigateByUrl('/sinAcceso')
    else{
      return true;
    }
};