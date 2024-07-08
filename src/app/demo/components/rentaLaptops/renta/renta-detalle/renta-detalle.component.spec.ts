import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentaDetalleComponent } from './renta-detalle.component';

describe('RentaDetalleComponent', () => {
  let component: RentaDetalleComponent;
  let fixture: ComponentFixture<RentaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentaDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
