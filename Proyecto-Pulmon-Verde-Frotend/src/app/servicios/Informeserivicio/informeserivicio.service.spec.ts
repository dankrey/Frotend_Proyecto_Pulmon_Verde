import { TestBed } from '@angular/core/testing';

import { InformeserivicioService } from './informeserivicio.service';

describe('InformeserivicioService', () => {
  let service: InformeserivicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformeserivicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
