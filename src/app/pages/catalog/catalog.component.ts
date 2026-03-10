import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductDetailsService } from '../productDetails/productDetails.service';
import { LucideAngularModule, Heart,Package,ArrowRight} from 'lucide-angular';
import { FavoritesService } from 'app/services/favourate.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  imports: [LucideAngularModule, RouterLink,CurrencyPipe],

})

export class CatalogComponent implements OnInit {
  icons = {
    Heart,Package,ArrowRight
  };

  constructor() { }
 private favoritesService = inject(FavoritesService);
  productDetails = inject(ProductDetailsService);
  productData = signal<any[]>([]);
  savefavorite = signal<boolean>(false);
  searchQuery = signal<string>('');
  favorites = signal<any[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));

  ngOnInit() {
    this.productDetails.getProducts().subscribe({
      next: (product: any[]) => {
        this.productData.set(product);
        console.log('Product Data Here', this.productData());
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.productData.set([]);
      }
    });
  }

  filteredProduct = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const data = this.productData();

    if (!query) return data;

    return data.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  });

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }




  addToFavorite(event: Event, product: any) {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggleFavorite(product);
  }

  // Helper for the template
isFavorite(productId: number): boolean {
  return this.favoritesService.isFavorite(productId);
}
}




