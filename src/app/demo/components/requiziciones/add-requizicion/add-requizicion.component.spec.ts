import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequizicionComponent } from './add-requizicion.component';

describe('AddRequizicionComponent', () => {
  let component: AddRequizicionComponent;
  let fixture: ComponentFixture<AddRequizicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRequizicionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRequizicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
