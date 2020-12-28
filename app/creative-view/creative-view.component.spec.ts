import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeViewComponent } from './creative-view.component';

describe('CreativeViewComponent', () => {
  let component: CreativeViewComponent;
  let fixture: ComponentFixture<CreativeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreativeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreativeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
