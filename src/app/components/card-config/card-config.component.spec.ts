import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConfigComponent } from './card-config.component';

describe('CardConfigComponent', () => {
  let component: CardConfigComponent;
  let fixture: ComponentFixture<CardConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardConfigComponent]
    });
    fixture = TestBed.createComponent(CardConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
