import { Component, inject } from "@angular/core";
import { InventoryService } from "../../services/inventory.service";
import { InventoryItem } from "../../interfaces/inventory-item.interface";
import { PaginatorComponent } from "../../layout/paginator/paginator.component";
import { ModalComponent } from "../../layout/modal/modal.component";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { fadeInAnimation } from "../../animations/fade-in.animation";
import { checkboxGrowAnimation } from "../../animations/checkbox-grow.animation";
import { Article } from "../../interfaces/article.interface";

@Component({
  selector: "app-inventory",
  standalone: true,
  imports: [PaginatorComponent, ModalComponent, ReactiveFormsModule],
  providers: [InventoryService],
  animations: [fadeInAnimation, checkboxGrowAnimation],
  templateUrl: "./inventory.component.html",
  styleUrl: "./inventory.component.scss",
})
export class InventoryComponent {
  // TODO: Hacer "paquete de iconos" con Symbol
  private inventoryService = inject(InventoryService);
  private fb = inject(FormBuilder);

  page: number = 1;
  pageSize: number = 10;
  totalArticles: number = 0;

  isAllSelected: boolean = false;
  isLoading: boolean = true;
  showModal: boolean = false;

  items: InventoryItem[] = [];
  itemToDelete: InventoryItem | undefined;
  itemForEdit: InventoryItem | undefined;

  disabledStyle = {
    "background-color": "#bfbdbd",
    cursor: "not-allowed",
  };

  editForm: FormGroup = this.fb.group({
    itemsForm: this.fb.array([]),
  });

  get shouldDeleteVisible(): boolean {
    return this.isAllSelected || this.items.some((item) => item.selected);
  }

  get itemsForm(): FormArray {
    return this.editForm!.get("itemsForm") as FormArray;
  }

  hasChanged<T extends Record<string, any>>(
    object: T,
    newValues: Partial<T>
  ): boolean {
    return (Object.keys(newValues) as Array<keyof T>).some(
      (key) => object[key] !== newValues[key]
    );
  }

  loadItems(): void {
    this.inventoryService.getItems(this.page, this.pageSize).subscribe({
      next: (response) => {
        this.totalArticles = response.total;

        this.items = response.data.map(
          (
            {
              name,
              currency,
              _id,
              price,
              quantity,
              lensType,
              productOrigin,
              type,
            }: Article,
            index
          ) => ({
            id: index + 1,
            objectId: _id!,
            brand: type === "Frame" ? name.split(" ")[0] : "-",
            model: type === "Frame" ? name.split(" ")[1] : "-",
            style: type === "Frame" ? name.split(" ")[2] : "-",
            lensType: type === "Lenses" ? lensType : "-",
            origin: type === "Lenses" ? productOrigin : "-",
            name: type !== "Frame" ? name : "-",
            price: price,
            currency: currency,
            stock: quantity,
            type: type,
            isEdit: false,
            selected: false,
          })
        );

        this.itemsForm.clear();
        this.initializeItemsForm();
      },
    });
  }

  initializeItemsForm(): void {
    this.items.forEach((item) => {
      const itemGroup = this.fb.group({
        model: [item.model],
        name: [item.name],
        brand: [item.brand],
        style: [item.style],
        lensType: [item.lensType],
        origin: [item.origin],
        price: [item.price],
        currency: [item.currency],
        stock: [item.stock],
      });
      this.itemsForm.push(itemGroup);
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.isAllSelected = false;
    this.loadItems();
  }

  onSelectItem(item: InventoryItem): void {
    item.selected = !item.selected;
    this.isAllSelected = this.items.every((item) => item.selected);
  }

  onSelectAll(): void {
    this.isAllSelected = !this.isAllSelected;
    this.items.forEach((item) => (item.selected = this.isAllSelected));
  }

  onDeleteItem(itemToRemove: InventoryItem): void {
    this.inventoryService.removeItem(itemToRemove.objectId).subscribe({
      next: () => {
        this.items = this.items.filter((item) => item !== itemToRemove);
        this.loadItems();
      },
    });
  }

  onToggleEditItem(item: InventoryItem) {
    item.isEdit = !item.isEdit;
  }

  onDeleteAllSelected(): void {
    const itemsIds: string[] = this.items
      .filter((item) => item.selected)
      .map((item) => item.objectId);

    this.inventoryService.removeMultipleItems(itemsIds).subscribe({
      next: () => {
        this.items = this.items.filter((item) => !item.selected);
        this.isAllSelected = false;
        this.loadItems();
      },
    });
  }

  onUpdateItem(item: InventoryItem, index: number): void {
    const updatedData = this.itemsForm.at(index).value;

    const {
      brand,
      model,
      style,
      name,
      lensType,
      origin,
      price,
      currency,
      stock,
    } = updatedData;

    if (!this.hasChanged(item, updatedData)) {
      item.isEdit = false;
      return;
    }

    const sendData = {
      name: item.type === "Frame" ? `${brand} ${model} ${style}` : name,
      ...(lensType && origin && { lensType, productOrigin: origin }),
      price,
      currency,
      quantity: stock,
    };

    this.inventoryService.updateItem(item.objectId, sendData).subscribe({
      next: () => {
        item.brand = brand;
        item.model = model;
        item.style = style;
        item.name = name;
        item.lensType = lensType;
        item.origin = origin;
        item.price = price;
        item.currency = currency;
        item.stock = stock;
        item.isEdit = false;
      },
    });
  }

  handleDelete(action: "single" | "multiple", item?: any): void {
    if (action === "single" && item) {
      this.itemToDelete = item;
    } else if (action === "multiple") {
      this.itemToDelete = undefined;
    }
    this.showModal = true;
  }

  handleCloseModal(result: boolean): void {
    if (result) {
      if (this.itemToDelete) {
        this.onDeleteItem(this.itemToDelete);
      } else {
        this.onDeleteAllSelected();
      }
    }

    this.showModal = false;
  }
}
