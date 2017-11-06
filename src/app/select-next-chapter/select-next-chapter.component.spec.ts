import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {SelectNextChapterComponent} from './select-next-chapter.component'

describe('SelectNextChapterComponent', () => {
  let component: SelectNextChapterComponent
  let fixture: ComponentFixture<SelectNextChapterComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectNextChapterComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectNextChapterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
