import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialPedidosClientePage } from './historial-pedidos-cliente.page';

describe('HistorialPedidosClientePage', () => {
  let component: HistorialPedidosClientePage;
  let fixture: ComponentFixture<HistorialPedidosClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPedidosClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
