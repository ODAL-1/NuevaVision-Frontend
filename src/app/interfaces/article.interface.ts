import { LensType } from "../enums/lens-type.enum";
import { ProductOrigin } from "../enums/product-origin.enum";

export interface Article {
  _id?: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  lensType: LensType;
  productOrigin: ProductOrigin;
  type: string;
}
