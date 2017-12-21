import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachNodeToChapterComponent } from './attach-node-to-chapter.component';

describe('AttachNodeToChapterComponent', () => {
  let component: AttachNodeToChapterComponent;
  let fixture: ComponentFixture<AttachNodeToChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachNodeToChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachNodeToChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
