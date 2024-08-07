import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationService {

    constructor() { }

    private updateSubject = new Subject<void>();
  updateObservable$ = this.updateSubject.asObservable();



  // hace que llame a get notifications en otros componentes y se actualice
  triggerUpdate() {
    this.updateSubject.next();
  }
    
}