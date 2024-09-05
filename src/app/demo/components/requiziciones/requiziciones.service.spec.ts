import { TestBed } from '@angular/core/testing';

import { RequizicionesService } from './requiziciones.service';

describe('RequizicionesService', () => {
  let service: RequizicionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequizicionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
