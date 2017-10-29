import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployersLandingpageComponent } from './employers-landingpage.component';

describe('EmployersLandingpageComponent', () => {
  let component: EmployersLandingpageComponent;
  let fixture: ComponentFixture<EmployersLandingpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployersLandingpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployersLandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
