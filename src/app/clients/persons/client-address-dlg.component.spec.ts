import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddressDlgComponent } from './client-address-dlg.component';

describe('ClientAddressDlgComponent', () => {
  let component: ClientAddressDlgComponent;
  let fixture: ComponentFixture<ClientAddressDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAddressDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAddressDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
