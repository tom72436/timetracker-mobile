import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAbsencesPage } from './add-absences.page';

describe('AddAbsencesPage', () => {
  let component: AddAbsencesPage;
  let fixture: ComponentFixture<AddAbsencesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddAbsencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
