import { TestBed } from '@angular/core/testing';

import { WallTemplateService } from './wall-template.service';

describe('WallTemplateServiceService', () => {
  let service: WallTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WallTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
