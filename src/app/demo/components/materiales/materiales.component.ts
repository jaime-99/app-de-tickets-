import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload, UploadEvent } from 'primeng/fileupload';
import { AuthService } from '../auth/auth.service';
import { MaterialesService } from './services/materiales.service';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrl: './materiales.component.scss',
})
export class MaterialesComponent implements OnInit {
  solicitudesForm: FormGroup;
  selectedFile: File;
  urlArchivo: any;
  files: any;
  ejemplo = true
  urlSubida = 'https://visualmanagment.com/AppCGP/apis/materiales/imagenes/'
  solicitudesForm2: FormGroup;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  usuario: any;
  // es para cuando se mande la solicitud que coloque un anuncio
  visible = false;
  nombreCompleto: string;

  //guardar los archivos aqui
  uploadedFiles: any[] = [];
  arrayArchivos: string[];
  isSacCategory: boolean;


  constructor(private messageService: MessageService,
    private fb:FormBuilder, private http: HttpClient,
    private authService:AuthService, private materialesService:MaterialesService,
  ) {}
  ngOnInit(): void {

    this.usuario = this.authService.getUser()
    this.nombreCompleto = `${this.usuario.nombre} ${this.usuario.apellido_paterno} ${this.usuario.apellido_materno}`

    this.solicitudesForm = this.fb.group({
      fecha:  [this.getCurrentDate(), Validators.required],
      usuario: [this.usuario.usuario, [Validators.required, Validators.maxLength(100)]],
      nombre: [this.nombreCompleto, [Validators.required, Validators.maxLength(100)]],
      nombre_curso: ['', [Validators.required, Validators.maxLength(150)]],
      idCurso: ['', Validators.required],
      link: ['', [Validators.maxLength(255), Validators.required]],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      archivo: ['', []],
      estatus: ['abierto', []]
    });

    this.solicitudesForm2 = this.fb.group({
      archivo: [null], // Inicializar el FormControl para el archivo
    });
  }

  onFileClear(event) {

    event.files[0] = null

    this.solicitudesForm2.patchValue({
      archivo: null, // Reinicia el FormControl
  });
    
  }


  onSubmit(){ 
    
    
    this.uploadFiles();
    return;
    
    console.log(this.arrayArchivos)

    const payload = {
      solicitud: this.solicitudesForm.value,
      archivos: this.arrayArchivos
    };

    return;

    console.log(this.fileUpload.files)
    this.materialesService.postSolicitud(payload).subscribe((res)=>{
      console.log(res)
      // this.visible = true;

    })

    // if(this.solicitudesForm.invalid) {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Faltan algunos datos, revise de nuevo' });
    //   this.markAllAsTouched()
      
    // }else{



    //   // this.materialesService.postSolicitud(this.solicitudesForm.value, this.arrayArchivos).subscribe((res)=>{
    //   //   // console.log(res)
    //   //   this.visible = true;

    //   // })
    // }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.solicitudesForm.get(field);
    return control ? control.invalid && control.touched : false;
  }
  markAllAsTouched(): void {
    Object.keys(this.solicitudesForm.controls).forEach(field => {
      const control = this.solicitudesForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      }
    });
  }
  


//   onUpload(event: any) {
//     // console.log('hola')

//     this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });

//     const uploadedFileResponse = event.originalEvent.body;

//     // Verifica si la respuesta contiene éxito y la ruta del archivo
//     if (uploadedFileResponse && uploadedFileResponse.success) {
//         const fileUrl = uploadedFileResponse.filePath; // Esto es lo que enviaste desde el servidor
//         // Mostrar la URL del archivo subido
//         console.log('Archivo subido en:', fileUrl);
//         this.urlArchivo = fileUrl
//         this.solicitudesForm.patchValue({link:this.urlArchivo});
//     } else {
//         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload file.' });
//         console.error('Error al subir el archivo:', uploadedFileResponse.message);
//     }
// }

onError(event: any) {
  console.error('Error al subir el archivo:', event);
}


onSelect(event: any) {
  // // Actualizar el FormControl con el archivo seleccionado
  // // console.log(event.files[0])
  // this.solicitudesForm2.patchValue({
  //   archivo: event.files[0], // Almacena el primer archivo
  // });

  // Crear una instancia de FormData para enviar múltiples archivos
  this.uploadedFiles = [];

  // Recorrer los archivos seleccionados y agregarlos al array `uploadedFiles`
  for (let file of event.files) {

    if (this.uploadedFiles.length < 3) {
      this.uploadedFiles.push(file);
    } else {


      // console.log('no se pueden subir mas de 3')
      // break; // Detener el bucle si ya se alcanzó el límite
    }
  }

  // console.log('Archivos seleccionados:', this.uploadedFiles); 
}
onRemove(event: any) {
  // Filtrar el archivo eliminado del array uploadedFiles
  this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== event.file.name);
  this.arrayArchivos = this.uploadedFiles.map(file => this.urlSubida + file.name);


}

uploadFiles() {

  if(this.solicitudesForm.invalid){
    this.markAllAsTouched();
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Te faltan datos que llenar' });

    return;
    
  }else{
  const formData = new FormData();

  // Utilizar los archivos manejados por PrimeNG
  for (let file of this.fileUpload.files) {

    if (this.uploadedFiles.length < 3) {
      // this.uploadedFiles.push(file);
      formData.append('demo[]', file);
    } else {
      break; // Detener el bucle si ya se alcanzó el límite
    }
  }

  // Realizar la solicitud POST para subir los archivos
  if (formData.getAll('demo[]').length <= 3) {
    // Realizar la solicitud POST para subir los archivos
    this.http.post('https://visualmanagment.com/AppCGP/apis/materiales/subidaArchivo.php', formData)
      .subscribe({
        next: (response) => {

          this.arrayArchivos = this.fileUpload.files.map(file => this.urlSubida + file.name);
          // console.log(this.arrayArchivos)

          const payload = {
            solicitud: this.solicitudesForm.value,
            archivos: this.arrayArchivos
          };

          this.materialesService.postSolicitud(payload).subscribe((res)=>{
            this.visible = true;
          })

        },
        error: (error) => {
          // console.log('Error al subir archivos:', error);
        }
      });
  } else {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No puedes subir mas de 3 archivos' });



  }
}
}


elimiarArchivo(){
  this.fileUpload.clear()
}



getCurrentDate(): string {
  const today = new Date();
  
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Sumamos 1 porque los meses en JavaScript empiezan desde 0
  const day = ('0' + today.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

// es para que se quiten los campos depeniendo de la categoria que seleccione
category(event:Event){
  const selectedValue = (event.target as HTMLSelectElement).value;

  if (selectedValue === 'Sac') {
    this.isSacCategory = true;
    this.solicitudesForm.get('nombre_curso')?.clearValidators();
    this.solicitudesForm.get('idCurso')?.clearValidators();
    this.solicitudesForm.get('link')?.setValidators([Validators.required]);

    // actualziar valores
    this.solicitudesForm.get('idCurso')?.updateValueAndValidity();
    this.solicitudesForm.get('link')?.updateValueAndValidity();
    this.solicitudesForm.get('nombre_curso')?.updateValueAndValidity();
    
  } else {
    this.isSacCategory = false;
    this.solicitudesForm.get('nombre_curso')?.setValidators([Validators.required]);
    this.solicitudesForm.get('idCurso')?.setValidators([Validators.required]);
    this.solicitudesForm.get('link')?.clearValidators();

    // actualizar valores
    this.solicitudesForm.get('link')?.updateValueAndValidity();
    this.solicitudesForm.get('idCurso')?.updateValueAndValidity();
    this.solicitudesForm.get('nombre_curso')?.updateValueAndValidity();
  }

  


}


  }

 

