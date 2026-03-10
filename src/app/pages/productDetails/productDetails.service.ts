import { Injectable } from '@angular/core';
import {  Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from './productDetails.module';
import { PRODUCTS } from 'app/data/products.data';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

constructor() { }

getProducts(): Observable<Product[]> {
  return of(PRODUCTS).pipe(
    delay(100),
    );
}

}


