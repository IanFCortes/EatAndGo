import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesaCheckPage } from './mesa-check.page';

describe('MesaCheckPage', () => {
  let component: MesaCheckPage;
  let fixture: ComponentFixture<MesaCheckPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
