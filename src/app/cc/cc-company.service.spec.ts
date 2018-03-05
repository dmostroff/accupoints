import { TestBed, inject } from '@angular/core/testing';

import { CcCompanyService } from './cc-company.service';

describe('CcCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CcCompanyService]
    });
  });

  it('should be created', inject([CcCompanyService], (service: CcCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
