import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexExamplesComponent } from './regex-examples.component';

describe('RegexExamplesComponent', () => {
  let component: RegexExamplesComponent;
  let fixture: ComponentFixture<RegexExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegexExamplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegexExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
