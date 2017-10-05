import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlyReadingComponent } from './currently-reading.component';

describe('CurrentlyReadingComponent', () => {
  let component: CurrentlyReadingComponent;
  let fixture: ComponentFixture<CurrentlyReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentlyReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentlyReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
