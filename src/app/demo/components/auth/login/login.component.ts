import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})

export class LoginComponent implements OnInit {
    loginForm:FormGroup;
    public loginSucess:boolean | undefined;
    password!: string;


    constructor( private messageService: MessageService, public layoutService: LayoutService,private fb: FormBuilder, private authService:AuthService, private router:Router ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
          });
     }
    ngOnInit() {

    }
     

    getUsers(){
        this.authService.getUsers().subscribe()

    }

    // onSubmit(): void {
    //     const { username, password } = this.loginForm.value;
    //     this.authService.login(username, password).subscribe(success => {
    //       this.loginSucess = success;
    //       if(this.loginSucess){

    //         this.router.navigate(['/dashboard']);
    //     }else{
    //         this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error en inicio de sesion' });
    //         }
    //     });
    //   }

      onSubmit2(){

        const {username, password} = this.loginForm.value;

        this.authService.login2(username,password).subscribe((res)=>{
            if(res && res.usuario){
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Inicio de sesion con exito' });
            this.router.navigate(['/dashboard'])
            this.authService.saveUser(res); // Guardar la información del usuario en localStorage

            }else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contraseña o Usuario incorrectos' });
            }
        })
      }

}
