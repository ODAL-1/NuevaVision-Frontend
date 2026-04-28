import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unitsSold: number;
  revenue: number;
}

interface ClickMetric {
  id: string;
  productName: string;
  clicks: number;
  conversionRate: number;
  lastClicked: Date;
}

interface PeriodComparison {
  current: number;
  previous: number;
  percentChange: number;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  timeRange: 'day' | 'week' | 'month' | 'year' = 'month';
  showFilterMenu = false;
  categoryFilter = 'all';

  products: Product[] = [];
  clickMetrics: ClickMetric[] = [];
  filteredProducts: Product[] = [];

  totalRevenue = 0;
  totalUnitsSold = 0;
  totalClicks = 0;
  averageConversionRate = 0;

  revenueComparison: PeriodComparison        = { current: 0, previous: 0, percentChange: 12.5 };
  unitsSoldComparison: PeriodComparison      = { current: 0, previous: 0, percentChange: 8.3 };
  clicksComparison: PeriodComparison         = { current: 0, previous: 0, percentChange: 15.2 };
  conversionRateComparison: PeriodComparison = { current: 0, previous: 0, percentChange: -2.1 };

  categories: string[] = ['Armazón', 'Lentes', 'Accesorios', 'Lentes de Sol', 'Lentes de Contacto', 'Cristales'];

  Math = Math;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.generateRealisticData();
    this.applyFilters();
  }

  generateRealisticData(): void {
    this.products = [];

    this.categories.forEach((category) => {
      const productsPerCategory = Math.floor(Math.random() * 2) + 3;

      for (let i = 1; i <= productsPerCategory; i++) {
        const price = Math.floor(Math.random() * 900) + 100;
        const sold = Math.floor(Math.random() * 50) + 1;

        this.products.push({
          id: `PRD-${this.products.length.toString().padStart(3, '0')}`,
          name: `${category} ${i}`,
          category,
          price,
          unitsSold: sold,
          revenue: price * sold,
        });
      }
    });

    for (let i = 1; i <= 5; i++) {
      const productCategory = this.categories[Math.floor(Math.random() * this.categories.length)];
      const price = Math.floor(Math.random() * 900) + 100;
      const sold = Math.floor(Math.random() * 50) + 1;

      this.products.push({
        id: `PRD-${this.products.length.toString().padStart(3, '0')}`,
        name: `Producto Extra ${i}`,
        category: productCategory,
        price,
        unitsSold: sold,
        revenue: price * sold,
      });
    }

    this.products.sort((a, b) => b.revenue - a.revenue);

    this.clickMetrics = [];
    for (let i = 1; i <= 15; i++) {
      const clicks = Math.floor(Math.random() * 1000) + 100;
      const conversionRate = Math.random() * 10 + 1;

      this.clickMetrics.push({
        id: `CLK-${i.toString().padStart(3, '0')}`,
        productName: `Producto ${i}`,
        clicks,
        conversionRate,
        lastClicked: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000),
      });
    }
  }

  applyFilters(): void {
    this.filteredProducts = this.categoryFilter === 'all'
      ? [...this.products]
      : this.products.filter(p => p.category === this.categoryFilter);

    this.calculateSummaryMetrics();
  }

  calculateSummaryMetrics(): void {
    this.totalRevenue   = this.filteredProducts.reduce((sum, p) => sum + p.revenue, 0);
    this.totalUnitsSold = this.filteredProducts.reduce((sum, p) => sum + p.unitsSold, 0);

    const filterRatio = this.products.length === 0 ? 1 : this.filteredProducts.length / this.products.length;
    this.totalClicks = Math.round(this.clickMetrics.reduce((sum, m) => sum + m.clicks, 0) * filterRatio);

    this.averageConversionRate = this.totalClicks > 0
      ? (this.totalUnitsSold / this.totalClicks) * 100
      : 0;

    const random = () => Math.random() * 20 - 10;

    this.revenueComparison = {
      current: this.totalRevenue,
      previous: this.totalRevenue / (1 + random() / 100),
      percentChange: this.categoryFilter === 'all' ? 12.5 : random(),
    };

    this.unitsSoldComparison = {
      current: this.totalUnitsSold,
      previous: this.totalUnitsSold / (1 + random() / 100),
      percentChange: this.categoryFilter === 'all' ? 8.3 : random(),
    };

    this.clicksComparison = {
      current: this.totalClicks,
      previous: this.totalClicks / (1 + random() / 100),
      percentChange: this.categoryFilter === 'all' ? 15.2 : random(),
    };

    this.conversionRateComparison = {
      current: this.averageConversionRate,
      previous: this.averageConversionRate / (1 + random() / 100),
      percentChange: this.categoryFilter === 'all' ? -2.1 : random(),
    };
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  closeFilterMenu(): void {
    this.showFilterMenu = false;
  }

  resetFilters(): void {
    this.timeRange = 'month';
    this.categoryFilter = 'all';
    this.loadData();
    this.showFilterMenu = false;
  }

  onTimeRangeChange(range: 'day' | 'week' | 'month' | 'year'): void {
    this.timeRange = range;
    this.loadData();
  }

  getShare(revenue: number): number {
    const top = this.filteredProducts[0]?.revenue ?? 0;
    return top === 0 ? 0 : (revenue / top) * 100;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  formatPercentage(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  }
}
