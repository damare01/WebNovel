import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenCarouselComponent } from './children-carousel.component';

describe('ChildrenCarouselComponent', () => {
  let component: ChildrenCarouselComponent;
  let fixture: ComponentFixture<ChildrenCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
