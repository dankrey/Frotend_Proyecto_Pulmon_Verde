import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogusuarioComponent } from './blogusuario.component';

describe('BlogusuarioComponent', () => {
  let component: BlogusuarioComponent;
  let fixture: ComponentFixture<BlogusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
