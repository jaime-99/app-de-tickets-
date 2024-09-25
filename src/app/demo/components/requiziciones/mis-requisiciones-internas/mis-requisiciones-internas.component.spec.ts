import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRequisicionesInternasComponent } from './mis-requisiciones-internas.component';

describe('MisRequisicionesInternasComponent', () => {
  let component: MisRequisicionesInternasComponent;
  let fixture: ComponentFixture<MisRequisicionesInternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisRequisicionesInternasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisRequisicionesInternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
