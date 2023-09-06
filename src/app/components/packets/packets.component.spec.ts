import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketsComponent } from './packets.component';

describe('PacketsComponent', () => {
  let component: PacketsComponent;
  let fixture: ComponentFixture<PacketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacketsComponent]
    });
    fixture = TestBed.createComponent(PacketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
