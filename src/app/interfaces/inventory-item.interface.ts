export interface InventoryItem {
  id: number;
  objectId: string;
  name: string;
  brand: string;
  model: string;
  style: string;
  lensType: string;
  origin: string;
  price: number;
  currency: string;
  stock: number;
  type: string;
  isEdit: boolean;
  selected: boolean;
}
