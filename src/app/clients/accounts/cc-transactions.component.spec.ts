import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcTransactionsComponent } from './cc-transactions.component';

describe('CcTransactionsComponent', () => {
  let component: CcTransactionsComponent;
  let fixture: ComponentFixture<CcTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
