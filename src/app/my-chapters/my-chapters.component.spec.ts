import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {MyChaptersComponent} from './my-chapters.component'

describe('MyChaptersComponent', () => {
  let component: MyChaptersComponent
  let fixture: ComponentFixture<MyChaptersComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyChaptersComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChaptersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
