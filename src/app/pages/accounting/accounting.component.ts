import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TxKind = 'income' | 'expense';
type TxStatus = 'reconciled' | 'pending';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  account: string;
  kind: TxKind;
  amount: number;
  status: TxStatus;
}

interface Kpi {
  label: string;
  value: number;
  delta: string;
  trend: 'up' | 'down';
  hint: string;
}

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss'],
})
export class AccountingComponent {
  view: 'all' | TxKind = 'all';
  query = '';

  kpis: Kpi[] = [
    { label: 'Ingresos del mes', value: 842350, delta: '+12,4%', trend: 'up',   hint: 'vs mes anterior' },
    { label: 'Egresos del mes',  value: 318420, delta: '+4,8%',  trend: 'up',   hint: 'vs mes anterior' },
    { label: 'Utilidad neta',    value: 523930, delta: '+18,2%', trend: 'up',   hint: 'margen 62,2%' },
    { label: 'Por conciliar',    value:  41280, delta: '-3,1%',  trend: 'down', hint: '8 movimientos' },
  ];

  transactions: Transaction[] = [
    { id: 'TX-9821', date: '2026-04-26', description: 'Cobro factura F-001284',   category: 'Ventas',       account: 'Banco Galicia', kind: 'income',  amount: 18450,  status: 'reconciled' },
    { id: 'TX-9820', date: '2026-04-25', description: 'Pago proveedor — Essilor', category: 'Compras',      account: 'Banco Galicia', kind: 'expense', amount: 24800,  status: 'reconciled' },
    { id: 'TX-9819', date: '2026-04-24', description: 'Cobro factura F-001283',   category: 'Ventas',       account: 'MercadoPago',   kind: 'income',  amount:  9200,  status: 'pending'    },
    { id: 'TX-9818', date: '2026-04-23', description: 'Alquiler local',           category: 'Gastos fijos', account: 'Banco Galicia', kind: 'expense', amount: 85000,  status: 'reconciled' },
    { id: 'TX-9817', date: '2026-04-22', description: 'Cobro factura F-001282',   category: 'Ventas',       account: 'Efectivo',      kind: 'income',  amount: 12750,  status: 'reconciled' },
    { id: 'TX-9816', date: '2026-04-21', description: 'Servicios — luz y agua',   category: 'Servicios',    account: 'Banco Galicia', kind: 'expense', amount:  6420,  status: 'pending'    },
    { id: 'TX-9815', date: '2026-04-20', description: 'Cobro factura F-001280',   category: 'Ventas',       account: 'Banco Galicia', kind: 'income',  amount: 22100,  status: 'reconciled' },
    { id: 'TX-9814', date: '2026-04-19', description: 'Sueldos personal',         category: 'Nómina',       account: 'Banco Galicia', kind: 'expense', amount: 142000, status: 'reconciled' },
    { id: 'TX-9813', date: '2026-04-18', description: 'Compra insumos limpieza',  category: 'Insumos',      account: 'Efectivo',      kind: 'expense', amount:  3120,  status: 'reconciled' },
    { id: 'TX-9812', date: '2026-04-17', description: 'Cobro factura F-001278',   category: 'Ventas',       account: 'MercadoPago',   kind: 'income',  amount: 31500,  status: 'reconciled' },
  ];

  get filtered(): Transaction[] {
    const q = this.query.trim().toLowerCase();
    return this.transactions.filter(t =>
      (this.view === 'all' || t.kind === this.view) &&
      (q === '' ||
        t.description.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q))
    );
  }

  get incomeTotal(): number {
    return this.transactions.filter(t => t.kind === 'income').reduce((a, b) => a + b.amount, 0);
  }

  get expenseTotal(): number {
    return this.transactions.filter(t => t.kind === 'expense').reduce((a, b) => a + b.amount, 0);
  }

  get netTotal(): number {
    return this.incomeTotal - this.expenseTotal;
  }

  get incomeShare(): number {
    const total = this.incomeTotal + this.expenseTotal;
    return total === 0 ? 0 : (this.incomeTotal / total) * 100;
  }

  formatMoney(n: number): string {
    return '$' + n.toLocaleString('es-AR');
  }

  signed(t: Transaction): string {
    const sign = t.kind === 'income' ? '+' : '−';
    return `${sign} ${this.formatMoney(t.amount)}`;
  }

  trackById(_: number, t: Transaction) {
    return t.id;
  }
}
