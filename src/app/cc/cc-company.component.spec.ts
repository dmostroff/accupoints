import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcCompanyComponent } from './cc-company.component';

describe('CcCompanyComponent', () => {
  let component: CcCompanyComponent;
  let fixture: ComponentFixture<CcCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
