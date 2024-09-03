import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequizicionesComponent } from './requiziciones.component';

describe('RequizicionesComponent', () => {
  let component: RequizicionesComponent;
  let fixture: ComponentFixture<RequizicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequizicionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequizicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
