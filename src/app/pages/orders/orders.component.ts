import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PrescriptionRow {
  key: string;
  label: string;
  lejos: string;
  cerca: string;
}

interface Article {
  id: number;
  name: string;
  detail: string;
  qty: number;
  price: number;
}

@Component({
  selector: 'app-orders',
  standalone: true, // Debe mantenerse en "TRUE"
  imports: [FormsModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // Cliente
  nombre = '';
  apellido = '';
  telefono = '';
  correo = '';
  direccion = '';

  documentTypes: string[] = ['Selecciona una opción', 'CI', 'Pasaporte', 'Otro'];
  selectedDocument: string = this.documentTypes[0];

  // Facturación
  beneficios = '';
  presupuesto = '';
  costo = '';
  total = '';

  paymentMethods: string[] = ['Selecciona una opción', 'Efectivo', 'Tarjeta', 'Transferencia'];
  selectedPaymentMethod: string = this.paymentMethods[0];

  // Tipo de venta — prescripción
  prescription: PrescriptionRow[] = [
    { key: 'OD', label: 'OD', lejos: '', cerca: '' },
    { key: 'OI', label: 'OI', lejos: '', cerca: '' },
    { key: 'Esf', label: 'Esf', lejos: '', cerca: '' },
    { key: 'Cil', label: 'Cil', lejos: '', cerca: '' },
    { key: 'Eje', label: 'Eje', lejos: '', cerca: '' },
    { key: 'AP', label: 'AP', lejos: '', cerca: '' },
    { key: 'DI', label: 'DI', lejos: '', cerca: '' },
  ];

  addOptions: string[] = ['Doctor', 'Optómetra', 'Externo'];
  selectedAdd: string = this.addOptions[0];
  observaciones = '';

  // Artículos
  articles: Article[] = [];

  finalizeOrder() {
    alert('¡Orden finalizada!');
  }

  cancelOrder() {
    alert('¡Orden cancelada!');
  }

  addLenses() {
    alert('¡Lentes agregados!');
  }

  addArticle() {
    alert('¡Artículo agregado!');
  }
}
