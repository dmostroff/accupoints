import { TestBed, inject } from '@angular/core/testing';

import { CcTransactionsService } from './cc-transactions.service';

describe('CcTransactionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CcTransactionsService]
    });
  });

  it('should be created', inject([CcTransactionsService], (service: CcTransactionsService) => {
    expect(service).toBeTruthy();
  }));
});
