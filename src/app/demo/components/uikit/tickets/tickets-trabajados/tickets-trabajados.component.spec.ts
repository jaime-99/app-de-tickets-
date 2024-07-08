import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsTrabajadosComponent } from './tickets-trabajados.component';

describe('TicketsTrabajadosComponent', () => {
  let component: TicketsTrabajadosComponent;
  let fixture: ComponentFixture<TicketsTrabajadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsTrabajadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsTrabajadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
