import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectConstructionAreaPage } from './select-construction-area.page';

describe('SelectConstructionAreaPage', () => {
  let component: SelectConstructionAreaPage;
  let fixture: ComponentFixture<SelectConstructionAreaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectConstructionAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
