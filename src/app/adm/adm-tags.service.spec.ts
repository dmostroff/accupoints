import { TestBed, inject } from '@angular/core/testing';

import { AdmTagsService } from './adm-tags.service';

describe('AdmTagsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdmTagsService]
    });
  });

  it('should be created', inject([AdmTagsService], (service: AdmTagsService) => {
    expect(service).toBeTruthy();
  }));
});
