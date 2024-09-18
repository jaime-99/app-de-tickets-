import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { requisicionesGuardGuard } from './requisiciones-guard.guard';

describe('requisicionesGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => requisicionesGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
