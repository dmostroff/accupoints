import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDlgComponent } from './person-dlg.component';

describe('PersonDlgComponent', () => {
  let component: PersonDlgComponent;
  let fixture: ComponentFixture<PersonDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
