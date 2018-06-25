import { TestBed, inject } from '@angular/core/testing';

import { CcActionsService } from './cc-actions.service.ts';

describe('CcActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CcActionsService]
    });
  });

  it('should be created', inject([CcActionsService], (service: CcActionsService) => {
    expect(service).toBeTruthy();
  }));
});
