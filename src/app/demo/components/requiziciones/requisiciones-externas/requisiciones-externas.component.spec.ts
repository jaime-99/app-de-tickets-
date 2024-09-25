import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicionesExternasComponent } from './requisiciones-externas.component';

describe('RequisicionesExternasComponent', () => {
  let component: RequisicionesExternasComponent;
  let fixture: ComponentFixture<RequisicionesExternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisicionesExternasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequisicionesExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
