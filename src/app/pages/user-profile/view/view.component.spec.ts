import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewComponent } from './view.component';

describe('ViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
