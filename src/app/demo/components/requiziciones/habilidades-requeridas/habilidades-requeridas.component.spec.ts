import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilidadesRequeridasComponent } from './habilidades-requeridas.component';

describe('HabilidadesRequeridasComponent', () => {
  let component: HabilidadesRequeridasComponent;
  let fixture: ComponentFixture<HabilidadesRequeridasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabilidadesRequeridasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabilidadesRequeridasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
