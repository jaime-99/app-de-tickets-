import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentaAsignadaDetalleComponent } from './renta-asignada-detalle.component';

describe('RentaAsignadaDetalleComponent', () => {
  let component: RentaAsignadaDetalleComponent;
  let fixture: ComponentFixture<RentaAsignadaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentaAsignadaDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentaAsignadaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
