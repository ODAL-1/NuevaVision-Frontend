import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft';

interface Invoice {
  number: string;
  client: string;
  email: string;
  issuedAt: string;
  dueAt: string;
  amount: number;
  status: InvoiceStatus;
}

interface KpiCard {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'flat';
  hint: string;
}

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent {
  filter: 'all' | InvoiceStatus = 'all';
  query = '';

  kpis: KpiCard[] = [
    { label: 'Total facturado',    value: '$842.350', delta: '+12,4%', trend: 'up',   hint: 'vs mes anterior' },
    { label: 'Pendiente de cobro', value: '$128.900', delta: '+3,1%',  trend: 'up',   hint: '14 facturas abiertas' },
    { label: 'Vencidas',           value: '$24.180',  delta: '-1,8%',  trend: 'down', hint: '3 facturas' },
    { label: 'Pagadas este mes',   value: '$689.270', delta: '+8,9%',  trend: 'up',   hint: '92 facturas' },
  ];

  invoices: Invoice[] = [
    { number: 'F-001284', client: 'Carolina Méndez',   email: 'carolina.mendez@mail.com', issuedAt: '2026-04-22', dueAt: '2026-05-06', amount: 18450,  status: 'paid'    },
    { number: 'F-001283', client: 'Ricardo Fernández', email: 'r.fernandez@mail.com',     issuedAt: '2026-04-21', dueAt: '2026-05-05', amount:  9200,  status: 'pending' },
    { number: 'F-001282', client: 'Lucía Rojas',       email: 'lucia.rojas@mail.com',     issuedAt: '2026-04-19', dueAt: '2026-05-03', amount: 12750,  status: 'pending' },
    { number: 'F-001281', client: 'Martín Acosta',     email: 'martin.acosta@mail.com',   issuedAt: '2026-04-18', dueAt: '2026-05-02', amount:  6300,  status: 'overdue' },
    { number: 'F-001280', client: 'Sofía Pereyra',     email: 'sofia.pereyra@mail.com',   issuedAt: '2026-04-17', dueAt: '2026-05-01', amount: 22100,  status: 'paid'    },
    { number: 'F-001279', client: 'Diego Morales',     email: 'diego.morales@mail.com',   issuedAt: '2026-04-15', dueAt: '2026-04-29', amount:  4980,  status: 'draft'   },
    { number: 'F-001278', client: 'Valentina Suárez',  email: 'val.suarez@mail.com',      issuedAt: '2026-04-14', dueAt: '2026-04-28', amount: 31500,  status: 'paid'    },
    { number: 'F-001277', client: 'Tomás Herrera',     email: 'tomas.herrera@mail.com',   issuedAt: '2026-04-12', dueAt: '2026-04-26', amount:  7820,  status: 'overdue' },
  ];

  get filtered(): Invoice[] {
    const q = this.query.trim().toLowerCase();
    return this.invoices.filter(i =>
      (this.filter === 'all' || i.status === this.filter) &&
      (q === '' || i.number.toLowerCase().includes(q) || i.client.toLowerCase().includes(q))
    );
  }

  statusLabel(s: InvoiceStatus): string {
    return { paid: 'Pagada', pending: 'Pendiente', overdue: 'Vencida', draft: 'Borrador' }[s];
  }

  formatMoney(n: number): string {
    return '$' + n.toLocaleString('es-AR');
  }

  trackByNumber(_: number, i: Invoice) {
    return i.number;
  }
}
