import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeEditComponent } from './creative-edit.component';

describe('CreativeEditComponent', () => {
  let component: CreativeEditComponent;
  let fixture: ComponentFixture<CreativeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreativeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreativeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
