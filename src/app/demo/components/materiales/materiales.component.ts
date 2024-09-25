import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrl: './materiales.component.scss'
})
export class MaterialesComponent implements OnInit {
  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
  }

  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
}

}
