import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcActionsListComponent } from './cc-actions-list.component';

describe('CcActionsListComponent', () => {
  let component: CcActionsListComponent;
  let fixture: ComponentFixture<CcActionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcActionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
