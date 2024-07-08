import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsSeleccionadosComponent } from './tickets-seleccionados.component';

describe('TicketsSeleccionadosComponent', () => {
  let component: TicketsSeleccionadosComponent;
  let fixture: ComponentFixture<TicketsSeleccionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsSeleccionadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsSeleccionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
