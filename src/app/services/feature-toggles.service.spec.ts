import { TestBed, inject } from '@angular/core/testing';

import { FeaturetogglesService } from './featuretoggles.service';

describe('FeaturetogglesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturetogglesService]
    });
  });

  it('should be created', inject([FeaturetogglesService], (service: FeaturetogglesService) => {
    expect(service).toBeTruthy();
  }));
});
