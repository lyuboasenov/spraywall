import { TestBed } from '@angular/core/testing';

import { StorageProxyService } from './storage-proxy.service';

describe('StorageProxyService', () => {
  let service: StorageProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
