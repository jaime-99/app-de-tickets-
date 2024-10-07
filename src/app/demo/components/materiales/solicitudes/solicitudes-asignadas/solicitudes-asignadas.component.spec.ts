import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesAsignadasComponent } from './solicitudes-asignadas.component';

describe('SolicitudesAsignadasComponent', () => {
  let component: SolicitudesAsignadasComponent;
  let fixture: ComponentFixture<SolicitudesAsignadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesAsignadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudesAsignadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
