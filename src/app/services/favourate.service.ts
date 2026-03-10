import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Initialize safely: check if browser before reading localStorage
  private favoritesSignal = signal<any[]>(
    this.isBrowser ? JSON.parse(localStorage.getItem('favorites') || '[]') : []
  );

  favorites = this.favoritesSignal.asReadonly();

  constructor() {

    //  isBrowser check ensures no errors during SSR setup.
    effect(() => {
      if (this.isBrowser) {
        localStorage.setItem('favorites', JSON.stringify(this.favoritesSignal()));
      }
    });
  }

  toggleFavorite(product: any) {
    if (!this.isBrowser) return; // Prevent logic on server
    
    this.favoritesSignal.update((favs) => {
      const exists = favs.find((p) => p.id === product.id);
      return exists 
        ? favs.filter((p) => p.id !== product.id) 
        : [...favs, product];
    });
  }

  isFavorite(productId: number): boolean {
    return this.favoritesSignal().some((p) => p.id === productId);
  }
}
