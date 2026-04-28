import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Article } from "../interfaces/article.interface";

@Injectable({
  providedIn: "root",
})
export class InventoryService {
  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  getItems(page: number, pageSize: number) {
    return this.http.get<{ data: Article[]; total: number }>(
      `${this.backendUrl}/article/all?page=${page}&pageSize=${pageSize}`
    );
  }

  removeItem(id: string) {
    return this.http.delete(`${this.backendUrl}/article/id/${id}`);
  }

  removeMultipleItems(itemsIds: string[]) {
    return this.http.post(`${this.backendUrl}/article/selected`, itemsIds);
  }

  updateItem(itemId: string, updatedData: any) {
    return this.http.put(
      `${this.backendUrl}/article/id/${itemId}`,
      updatedData
    );
  }
}
