import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobCellComponent } from './employer-job-cell.component';

describe('EmployerJobCellComponent', () => {
  let component: EmployerJobCellComponent;
  let fixture: ComponentFixture<EmployerJobCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerJobCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerJobCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
