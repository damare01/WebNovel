import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationGraphComponent } from './navigation-graph.component';

describe('NavigationGraphComponent', () => {
  let component: NavigationGraphComponent;
  let fixture: ComponentFixture<NavigationGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
