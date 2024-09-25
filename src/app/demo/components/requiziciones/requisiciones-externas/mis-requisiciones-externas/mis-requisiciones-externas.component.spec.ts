import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRequisicionesExternasComponent } from './mis-requisiciones-externas.component';

describe('MisRequisicionesExternasComponent', () => {
  let component: MisRequisicionesExternasComponent;
  let fixture: ComponentFixture<MisRequisicionesExternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisRequisicionesExternasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisRequisicionesExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
