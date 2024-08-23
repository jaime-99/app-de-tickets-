import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../components/auth/auth.service';





export const rentaGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authService = inject(AuthService);
  const isAuthenticated = authService.getUser();

  
  if(isAuthenticated.tipoId ===2 || isAuthenticated.tipoId===4){
    return router.navigateByUrl('/sinAcceso')
  }
    else{
      return true;
    }
};

// para que las rentas solo las pueda ver el de sistemas
export const rentaGuard2: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authService = inject(AuthService);
  const isAuthenticated = authService.getUser();

  
  if(isAuthenticated.area !=='Sistemas' ){
    return router.navigateByUrl('/sinAcceso')
  }
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




