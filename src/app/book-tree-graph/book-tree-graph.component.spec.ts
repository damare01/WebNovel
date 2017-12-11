import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTreeGraphComponent } from './book-tree-graph.component';

describe('BookTreeGraphComponent', () => {
  let component: BookTreeGraphComponent;
  let fixture: ComponentFixture<BookTreeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTreeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTreeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
