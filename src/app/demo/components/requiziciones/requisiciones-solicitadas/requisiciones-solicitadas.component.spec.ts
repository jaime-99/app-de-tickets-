import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicionesSolicitadasComponent } from './requisiciones-solicitadas.component';

describe('RequisicionesSolicitadasComponent', () => {
  let component: RequisicionesSolicitadasComponent;
  let fixture: ComponentFixture<RequisicionesSolicitadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisicionesSolicitadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequisicionesSolicitadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
