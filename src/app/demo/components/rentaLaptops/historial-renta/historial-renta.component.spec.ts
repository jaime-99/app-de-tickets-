import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialRentaComponent } from './historial-renta.component';

describe('HistorialRentaComponent', () => {
  let component: HistorialRentaComponent;
  let fixture: ComponentFixture<HistorialRentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialRentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialRentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
