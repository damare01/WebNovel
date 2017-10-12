import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {MyChaptersPageComponent} from './my-chapters-page.component'

describe('MyChaptersPageComponent', () => {
  let component: MyChaptersPageComponent
  let fixture: ComponentFixture<MyChaptersPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyChaptersPageComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChaptersPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
