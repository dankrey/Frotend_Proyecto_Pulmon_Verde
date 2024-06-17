import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeComponetComponent } from './informe-componet.component';

describe('InformeComponetComponent', () => {
  let component: InformeComponetComponent;
  let fixture: ComponentFixture<InformeComponetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformeComponetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformeComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
