import { TestBed, inject } from '@angular/core/testing';

import { ClientAccountsService } from './client-accounts.service';

describe('ClientAccountsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientAccountsService]
    });
  });

  it('should be created', inject([ClientAccountsService], (service: ClientAccountsService) => {
    expect(service).toBeTruthy();
  }));
});
