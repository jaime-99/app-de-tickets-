import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationService {

    constructor() { }

    private updateSubject = new Subject<void>();
  updateObservable$ = this.updateSubject.asObservable();



  triggerUpdate() {
    this.updateSubject.next();
  }
    
}