import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasExternasComponent } from './todas-externas.component';

describe('TodasExternasComponent', () => {
  let component: TodasExternasComponent;
  let fixture: ComponentFixture<TodasExternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodasExternasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodasExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
