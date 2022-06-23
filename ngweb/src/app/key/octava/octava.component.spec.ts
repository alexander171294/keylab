import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OctavaComponent } from './octava.component';

describe('OctavaComponent', () => {
  let component: OctavaComponent;
  let fixture: ComponentFixture<OctavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OctavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OctavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
