import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcCompanycardsComponent } from './cc-companycards.component';

describe('CcCompanycardsComponent', () => {
  let component: CcCompanycardsComponent;
  let fixture: ComponentFixture<CcCompanycardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcCompanycardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcCompanycardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
