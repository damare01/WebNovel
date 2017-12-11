import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookGraphComponent } from './book-graph.component';

describe('BookGraphComponent', () => {
  let component: BookGraphComponent;
  let fixture: ComponentFixture<BookGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
