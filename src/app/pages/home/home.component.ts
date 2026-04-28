import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OrderCard {
  id: string;
  client: string;
  reference: string;
  days: number;
}

interface KanbanColumn {
  key: 'registered' | 'in-course' | 'finalized' | 'delivered';
  label: string;
  description: string;
  orders: OrderCard[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  columns: KanbanColumn[] = [
    {
      key: 'registered',
      label: 'Ingresado',
      description: 'Órdenes recién creadas',
      orders: this.buildOrders('registered', 10)
    },
    {
      key: 'in-course',
      label: 'En curso',
      description: 'En proceso de armado',
      orders: this.buildOrders('incourse', 10)
    },
    {
      key: 'finalized',
      label: 'Finalizado',
      description: 'Listas para retirar',
      orders: this.buildOrders('finished', 10)
    },
    {
      key: 'delivered',
      label: 'Entregado',
      description: 'Entregadas al cliente',
      orders: this.buildOrders('delivered', 10)
    }
  ];

  trackByKey(_: number, item: KanbanColumn) {
    return item.key;
  }

  trackById(_: number, item: OrderCard) {
    return item.id;
  }

  createOrder(): void {
    // Hook to navigate to order creation
  }

  openMenu(column: KanbanColumn): void {
    // Hook to open column actions
    void column;
  }

  private buildOrders(prefix: string, count: number): OrderCard[] {
    return Array.from({ length: count }, (_, i) => ({
      id: `${prefix}-${i + 1}`,
      client: `Client ${i + 1}`,
      reference: `${prefix}-${i + 1}`,
      days: i + 1
    }));
  }
}