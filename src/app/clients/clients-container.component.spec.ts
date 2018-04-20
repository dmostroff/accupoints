import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsContainerComponent } from './clients-container.component.ts';

describe('ClientsContainerComponent', () => {
  let component: ClientsContainerComponent;
  let fixture: ComponentFixture<ClientsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
