import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiariesEditComponent } from './diary-edit.component';

describe('DiariesEditComponent', () => {
  let component: DiariesEditComponent;
  let fixture: ComponentFixture<DiariesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiariesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiariesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
