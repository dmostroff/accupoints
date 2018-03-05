import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcCompanyListComponent } from './cc-company-list.component';

describe('CcCompanyListComponent', () => {
  let component: CcCompanyListComponent;
  let fixture: ComponentFixture<CcCompanyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcCompanyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
