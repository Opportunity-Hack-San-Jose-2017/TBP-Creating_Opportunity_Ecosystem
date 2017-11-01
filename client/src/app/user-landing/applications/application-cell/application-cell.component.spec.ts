import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCellComponent } from './application-cell.component';

describe('ApplicationCellComponent', () => {
  let component: ApplicationCellComponent;
  let fixture: ComponentFixture<ApplicationCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
