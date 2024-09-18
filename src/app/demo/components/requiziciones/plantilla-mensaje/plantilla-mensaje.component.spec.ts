import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaMensajeComponent } from './plantilla-mensaje.component';

describe('PlantillaMensajeComponent', () => {
  let component: PlantillaMensajeComponent;
  let fixture: ComponentFixture<PlantillaMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaMensajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantillaMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
