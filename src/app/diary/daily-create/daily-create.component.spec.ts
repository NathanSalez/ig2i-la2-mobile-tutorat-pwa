import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCreateComponent } from './daily-create.component';

describe('DailyCreateComponent', () => {
  let component: DailyCreateComponent;
  let fixture: ComponentFixture<DailyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
