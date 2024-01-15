import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeeklyReviewPage } from './weekly-review.page';

describe('WeeklyReviewPage', () => {
  let component: WeeklyReviewPage;
  let fixture: ComponentFixture<WeeklyReviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WeeklyReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
