import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders().set('authorId', environment.authorId)
  products: Product[] = [];
  constructor(private http: HttpClient) {

  }


  load(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`, { headers: this.headers });
  }
  setData(products: Product[]) {
    this.products = products;
  }
  getProduct(id:string):Product | undefined{
    return this.products.find(c=>c.id==id);
  }
  add(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, data, { headers: this.headers });
  }
  update(data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products`, data, { headers: this.headers });
  }
  verify(id: string): Observable<boolean> {
    let params = new HttpParams().append('id', id);
    return this.http.get<boolean>(`${this.baseUrl}/products/verification`, { params, headers: this.headers });
  }

  delete(id: string): Observable<any> {
    let params = new HttpParams().append('id', id);
    return this.http.delete<any>(`${this.baseUrl}/products`, { params, headers: this.headers ,responseType:'text' as 'json'});
  }
}
