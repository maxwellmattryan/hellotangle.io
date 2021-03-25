import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMessagePage } from './create-message.page';

describe('CreateMessagePage', () => {
  let component: CreateMessagePage;
  let fixture: ComponentFixture<CreateMessagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMessagePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
