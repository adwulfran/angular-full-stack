import { TestBed, inject } from '@angular/core/testing';

import { DatacartService } from './datacart.service';

describe('DatacartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatacartService]
    });
  });

  it('should be created', inject([DatacartService], (service: DatacartService) => {
    expect(service).toBeTruthy();
  }));
});
