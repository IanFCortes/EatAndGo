import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenPedidoClientePage } from './resumen-pedido-cliente.page';

describe('ResumenPedidoClientePage', () => {
  let component: ResumenPedidoClientePage;
  let fixture: ComponentFixture<ResumenPedidoClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenPedidoClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
