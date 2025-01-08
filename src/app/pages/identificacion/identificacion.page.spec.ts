import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentificacionPage } from './identificacion.page';

describe('IdentificacionPage', () => {
  let component: IdentificacionPage;
  let fixture: ComponentFixture<IdentificacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
