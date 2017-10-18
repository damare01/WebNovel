import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterDiscussionComponent } from './chapter-discussion.component';

describe('ChapterDiscussionComponent', () => {
  let component: ChapterDiscussionComponent;
  let fixture: ComponentFixture<ChapterDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
