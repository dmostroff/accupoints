import { TestBed, inject } from '@angular/core/testing';

import { AdmUsersService } from './adm-users.service';

describe('AdmUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdmUsersService]
    });
  });

  it('should be created', inject([AdmUsersService], (service: AdmUsersService) => {
    expect(service).toBeTruthy();
  }));
});
