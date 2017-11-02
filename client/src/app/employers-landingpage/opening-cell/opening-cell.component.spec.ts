import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningCellComponent } from './opening-cell.component';

describe('OpeningCellComponent', () => {
  let component: OpeningCellComponent;
  let fixture: ComponentFixture<OpeningCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
