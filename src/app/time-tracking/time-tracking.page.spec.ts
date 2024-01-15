import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeTrackingPage } from './time-tracking.page';

describe('TimeTrackingPage', () => {
  let component: TimeTrackingPage;
  let fixture: ComponentFixture<TimeTrackingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TimeTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
