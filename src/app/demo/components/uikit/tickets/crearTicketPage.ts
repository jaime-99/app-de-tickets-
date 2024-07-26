import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorias } from './interface/ticket-interface'; 
import { TicketsServiceService } from '../services/tickets-service.service';
import { AuthService } from '../../auth/auth.service';
import { Observable, map } from 'rxjs';
import { usuario } from '../../auth/interfaces/usuario.interface';
import { Categoria2 } from 'src/app/demo/interfaces/area-interface';

@Component({
    templateUrl: './crearTicketPage.html'
})
export class CrearTicketPage implements OnInit {
    categorias = Categorias.categoria;
    area = Categorias.areas;
    ticketForm: FormGroup;
    selectedState: any;
    categoriaSeleccionada: any;
    idArea:number[] = []; //es el id del area en el que esta
    user: usuario; // agregar interface de usuario 
    nombreArea:string; // nombre del area del usuario
    totalAreas = []; // las areas totales que hay
    categorias2 = []; 
    filteredCategorias: Categoria2[] = [];
    Message:boolean = false; 
    actuallyDay: string;
    IdArea2:any
    emailSend = []; // arreglo de todos los correos a enviar el ticket
    emailSendAlone:string;
    usuariosNotification:any; // son los usuarios a los que se le mandara la notificacion

    
    
    constructor(private fb: FormBuilder,private ticketsService:TicketsServiceService, private authService:AuthService ) {}
    
    ngOnInit(){
      this.getCurrentDate();
      // this.getCategorias();
      this.ticketsService.getAreas().subscribe((res)=>{
        this.getCategorias()
        this.totalAreas = res
      })

      //obtener datos del usuario
      this.user = this.authService.getUser();
      this.nombreArea = this.user.area;

      // this.ticketsService.getAreas().subscribe((res)=>{
      //   // Filtramos las áreas que tienen el nombre "Sistemas"
      //  const sistemasAreas = res.filter(area => area.area === this.nombreArea);
      //  // Mapeamos para obtener solo los IdArea de las áreas filtradas
      //  const idAreas = sistemasAreas.map(area => area.IdArea);
      //  // Imprimimos los IdAreas para 
      //  this.idArea = idAreas
      // //  console.log(this.idArea)
      // })

      this.ticketForm = this.fb.group({
        titulo: ['', [Validators.required, Validators.minLength(5)]],
        fecha: [this.actuallyDay, Validators.required],
        descripcion: ['', Validators.required],
        para_area: [''],
        area: [this.user.area, Validators.required],
        correo: [this.user.correo, Validators.required],
        estatus: ['abierto', [Validators.required]],
        nombre: [this.user.nombre, [Validators.required, Validators.maxLength(50)]],
        apellido: [this.user.apellido_paterno, Validators.required],
        nombre_usuario: [this.user.usuario, Validators.required],
        IdCategoria: [''],
        });
        }

        updateCategoria(event:any){
          
          const selectedCategoria = event.value;
          this.ticketForm.patchValue({ categoria: selectedCategoria });
        }
        
    onSubmit() {
      // this.sendEmailToMe()
      // this.sendEmailFinally()
      // return;
      this.Message = true;
      if (this.ticketForm.valid) {
        // manejar la sumisión del formulario
        // console.log(this.ticketForm)
        this.ticketsService.ticketCreated()
        this.ticketsService.insertTickets(this.ticketForm.value).subscribe((res)=>{
          // console.log(res)
          //mandar la notificacion 
          this.addNotification()
          })
        } else {
            // console.log('Formulario inválido, datos:', this.ticketForm.value);
            this.ticketForm.markAllAsTouched();
        }
      }
    
      isFieldInvalid(field: string): boolean {
        const control = this.ticketForm.get(field);
        return control ? control.invalid && control.touched : false;
      }


      getCategorias(){
        this.ticketsService.getCategorias().subscribe((res)=>{
          this.categorias2 = res
        })
      }

      // esto cambia las categorias dependiendo del evento 
      updateCategoria2(event) {
        // console.log(event.value)
        
        //todo validar esto */ if(event.value===this.user) 
        const selectedArea = event.value;
        this.IdArea2 = selectedArea;
        this.filteredCategorias = this.categorias2.filter(cat => cat.IdArea === selectedArea);
        this.sendEmail()
      }

      //obtener el idArea
      sendEmail(){
        // console.log(this.IdArea2)

        let sendEmail = ''
        if(this.IdArea2==='1'){
          sendEmail = 'Sistemas'
        }else if(this.IdArea2 ==='2'){
          sendEmail = 'Comercial'
        }else if(this.IdArea2==='3'){
          sendEmail = 'Administracion'
        }else if(this.IdArea2==='4'){
          sendEmail = 'Diseño'
        }else if(this.IdArea2 ==='5'){
          sendEmail = 'RH'
        }else if(this.IdArea2 ==='6'){
          sendEmail = 'Materiales'
        }
        this.getUsuariosForArea(sendEmail)

        this.ticketsService.getEmailsForArea(sendEmail).subscribe((res)=>{

          if(Array.isArray(res)){

            this.emailSend = res.map(user => user.correo)
            // console.log('el correo es', this.emailSend)
          }else{
            // console.log('no tiene correo')
            return;
          }

          // Ejemplo de recorrido del array de correos
          this.emailSend.forEach(email => {
            // console.log(email); // Aquí puedes realizar alguna operación con cada correo
          });

        })
      
      }

      getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
        const day = String(today.getDate()).padStart(2, '0');
        
        this.actuallyDay= `${year}-${month}-${day}`;
      }

      sendEmailFinally(){

        this.emailSend.forEach(email => {
          // console.log(email); // Aquí puedes realizar alguna operación con cada correo
          // this.emailSendAlone = email
        
        
        const data = {
          to: email,
          subject : 'Recibo de Ticket',
          body: `Te ha enviado un ticket la persona con el nombre -   ${this.user.nombre}. Da click Aqui para acepetar el ticket` 
        }

        this.ticketsService.sendEmails(data).subscribe((res)=>{
          // console.log(res)
        })
      })
      }

      sendEmailToMe(){
        //envar correo a mi mismo cuando envio un ticket
        const email = this.user.correo;
        const date = this.ticketForm.get('fecha').value
        const descripcion = this.ticketForm.get('descripcion').value;
        const data = {
          to:email,
          subject: 'Envio de ticket',
          body: `Hola ${this.user.nombre}, has enviado un ticket, 
    con el asunto ${descripcion} , con la fecha de : ${date} espera confirmacion de ticket aceptado.
          `
        }

        this.ticketsService.sendEmails(data).subscribe((res)=>{
          
        })
        
      }


      getUsuariosForArea(sendEmail?){
        this.ticketsService.getusuariosForArea(sendEmail).subscribe((res)=>{
          this.usuariosNotification = res
        });
      }
      addNotification() {
        this.usuariosNotification.forEach(usuario => {
          let data = {
            user_id: usuario.id,
            usuario: usuario,
            message: `ticket enviado por ${this.user.usuario}`,
            tipo:1
          };
    
          this.ticketsService.addNotification(data).subscribe((res) => {
            // console.log(`Notificación enviada a ${usuario.usuario}:`, res);
            
          });
        });
      }
    

      

}