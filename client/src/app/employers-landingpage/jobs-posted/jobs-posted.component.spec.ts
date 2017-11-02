import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPostedComponent } from './jobs-posted.component';

describe('JobsPostedComponent', () => {
  let component: JobsPostedComponent;
  let fixture: ComponentFixture<JobsPostedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsPostedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsPostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
