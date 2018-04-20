import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientaccountsContainerComponent } from './client-accounts-container.component.ts';

describe('ClientaccountsContainerComponent', () => {
  let component: ClientaccountsContainerComponent;
  let fixture: ComponentFixture<ClientaccountsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientaccountsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientaccountsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
