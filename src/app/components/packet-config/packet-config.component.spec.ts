import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketConfigComponent } from './packet-config.component';

describe('PacketConfigComponent', () => {
  let component: PacketConfigComponent;
  let fixture: ComponentFixture<PacketConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacketConfigComponent]
    });
    fixture = TestBed.createComponent(PacketConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
