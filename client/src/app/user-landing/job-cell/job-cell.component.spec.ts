import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCellComponent } from './job-cell.component';

describe('JobCellComponent', () => {
  let component: JobCellComponent;
  let fixture: ComponentFixture<JobCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
