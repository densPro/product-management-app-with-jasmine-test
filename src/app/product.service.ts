import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5187/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, product);
  }

  updateProduct(updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/products/${updatedProduct.id}`, updatedProduct);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${id}`);
  }
}
  