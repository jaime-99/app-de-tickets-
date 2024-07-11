import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsivaComponent } from './responsiva.component';

describe('ResponsivaComponent', () => {
  let component: ResponsivaComponent;
  let fixture: ComponentFixture<ResponsivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsivaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
