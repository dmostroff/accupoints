import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcCompanyDlgComponent } from './cc-company-dlg.component';

describe('CcCompanyDlgComponent', () => {
  let component: CcCompanyDlgComponent;
  let fixture: ComponentFixture<CcCompanyDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcCompanyDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcCompanyDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
