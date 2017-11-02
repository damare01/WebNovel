import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPopupButtonComponent } from './notification-popup-button.component';

describe('NotificationPopupButtonComponent', () => {
  let component: NotificationPopupButtonComponent;
  let fixture: ComponentFixture<NotificationPopupButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationPopupButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPopupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
