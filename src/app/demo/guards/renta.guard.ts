import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../components/auth/auth.service';





export const rentaGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authService = inject(AuthService);
  const isAuthenticated = authService.getUser();

  console.log(isAuthenticated.tipoId)

  if(isAuthenticated.tipoId ===2)
    return router.navigateByUrl('/sinAcceso')
    else{
      return true;
    }
};

// export const generalGuard2: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const authService = inject(AuthService);
  
//   const isAuthenticated = authService.getUser();
//   if (isAuthenticated) {
//     localStorage.clear();
//     return true;
//   }else{
//     return true;
//   }
  

  // return false;




