import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KineretComponent } from './kineret.component';

describe('KineretComponent', () => {
  let component: KineretComponent;
  let fixture: ComponentFixture<KineretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KineretComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KineretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
