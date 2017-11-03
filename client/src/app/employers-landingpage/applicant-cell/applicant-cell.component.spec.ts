import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantCellComponent } from './applicant-cell.component';

describe('ApplicantCellComponent', () => {
  let component: ApplicantCellComponent;
  let fixture: ComponentFixture<ApplicantCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
