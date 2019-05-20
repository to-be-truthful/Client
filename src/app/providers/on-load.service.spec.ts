import { TestBed } from '@angular/core/testing';

import { OnLoadService } from './on-load.service';

describe('OnLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnLoadService = TestBed.get(OnLoadService);
    expect(service).toBeTruthy();
  });
});
