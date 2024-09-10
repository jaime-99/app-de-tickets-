import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicionSolicitadaDetalleComponent } from './requisicion-solicitada-detalle.component';

describe('RequisicionSolicitadaDetalleComponent', () => {
  let component: RequisicionSolicitadaDetalleComponent;
  let fixture: ComponentFixture<RequisicionSolicitadaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisicionSolicitadaDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequisicionSolicitadaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
