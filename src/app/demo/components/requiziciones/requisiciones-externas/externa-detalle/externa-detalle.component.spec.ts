import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternaDetalleComponent } from './externa-detalle.component';

describe('ExternaDetalleComponent', () => {
  let component: ExternaDetalleComponent;
  let fixture: ComponentFixture<ExternaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternaDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExternaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
