import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountsContainerComponent } from './client-accounts-container.component.ts';

describe('ClientaccountsContainerComponent', () => {
  let component: ClientAccountsContainerComponent;
  let fixture: ComponentFixture<ClientAccountsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAccountsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccountsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
