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
  styleUrl: './materiales.component.scss'
})
export class MaterialesComponent implements OnInit {
  solicitudesForm: FormGroup;
  selectedFile: File;
  urlArchivo: any;
  files: any;
  ejemplo = true
  urlSubida = '/home1/visualn4/public_html/AppCGP/apis/materiales/imagenes/'
  solicitudesForm2: FormGroup;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  usuario: any;
  // es para cuando se mande la solicitud que coloque un anuncio
  visible = false;

  constructor(private messageService: MessageService,
    private fb:FormBuilder, private http: HttpClient,
    private authService:AuthService, private materialesService:MaterialesService
  ) {}
  ngOnInit(): void {

    this.usuario = this.authService.getUser()

    this.solicitudesForm = this.fb.group({
      fecha:  [ {value: this.getCurrentDate(), disabled:true}, Validators.required],
      usuario: [this.usuario.usuario, [Validators.required, Validators.maxLength(100)]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      nombre_curso: ['', [Validators.required, Validators.maxLength(150)]],
      idCurso: ['', Validators.required],
      link: ['', [Validators.maxLength(255)]],
      categoria: ['', Validators.maxLength(100)],
      descripcion: [''],
      archivo: ['', [Validators.required, Validators.maxLength(255)]],
      estatus: ['abierto', [Validators.required, Validators.maxLength(255)]]
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

    this.materialesService.postSolicitud(this.solicitudesForm.value).subscribe((res)=>{
      // console.log(res)

    })
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
  // Actualizar el FormControl con el archivo seleccionado
 
  console.log(event.files[0])
  this.solicitudesForm2.patchValue({
    archivo: event.files[0], // Almacena el primer archivo
  });

}

uploadFiles() {
  //subir el archivo al servidor
  const file = this.solicitudesForm2.get('archivo')?.value;
  
  if (file) {
    // Aquí puedes implementar la lógica para subir el archivo al servidor
    // console.log('Archivo listo para subir:', file);
    const formData = new FormData();
      formData.append('demo[]', file); // Agregar el archivo a FormData
      console.log(file.name)
      this.solicitudesForm.patchValue({
        archivo: `${this.urlSubida}${file.name}`
      })

      // Hacer la solicitud POST al servidor
      this.http.post('https://visualmanagment.com/AppCGP/apis/materiales/subidaArchivo.php', formData)
        .subscribe({
          next: (response) => {
            console.log('Archivo subido con éxito:', response);
            this.urlArchivo = response['filePath'];
          },
          error: (error) => {
            console.error('Error al subir el archivo:', error);
          },
        });

  } else {
    console.log('No se ha seleccionado ningún archivo.');
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




  }

 

