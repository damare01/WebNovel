import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {MyBooksPageComponent} from './my-books-page.component'

describe('MyBooksPageComponent', () => {
  let component: MyBooksPageComponent
  let fixture: ComponentFixture<MyBooksPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyBooksPageComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBooksPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
