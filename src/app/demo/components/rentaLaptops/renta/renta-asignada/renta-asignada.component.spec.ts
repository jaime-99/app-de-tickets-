import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentaAsignadaComponent } from './renta-asignada.component';

describe('RentaAsignadaComponent', () => {
  let component: RentaAsignadaComponent;
  let fixture: ComponentFixture<RentaAsignadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentaAsignadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentaAsignadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
