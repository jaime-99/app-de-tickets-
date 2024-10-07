import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { materialesGuard } from './materiales.guard';

describe('materialesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => materialesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
