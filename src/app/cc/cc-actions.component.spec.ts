import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcActionsComponent } from './cc-actions.component.ts';

describe('CcActionsComponent', () => {
  let component: CcActionsComponent;
  let fixture: ComponentFixture<CcActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
