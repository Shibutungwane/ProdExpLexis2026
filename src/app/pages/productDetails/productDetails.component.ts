import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductDetailsService } from './productDetails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule, CircleAlert ,ArrowLeft,Package,Heart,ShoppingCart} from 'lucide-angular';
import { Product } from './productDetails.module';
import { CurrencyPipe , } from '@angular/common';
import { FavoritesService } from 'app/services/favourate.service';

@Component({
  selector: 'app-productDetails',
  standalone: true,
  imports: [LucideAngularModule,CurrencyPipe, ],
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.css'],
})
export class ProductDetailsComponent implements OnInit {

  icons = { CircleAlert, ArrowLeft,Package,Heart,ShoppingCart,};

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productDetails = inject(ProductDetailsService);
 private favoritesService = inject(FavoritesService);

  id = signal<string>(''); // initialize with empty string
  product = signal<Product | null>(null);

  ngOnInit() {
    // set id from route
    this.id.set(this.route.snapshot.paramMap.get('id')!);
    console.log('Product ID:', this.id());

    this.productDetails.getProducts().subscribe({
      next: (products: Product[]) => {
        const foundProduct = products.find(p => String(p.id) === this.id());
        this.product.set(foundProduct ?? null);
        console.log('Selected Product:', this.product());
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.product.set(null);
      }
    });
  }
  addToFavorite(event: Event, product: any) {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggleFavorite(product);
  }

 
isFavorite(productId: number): boolean {
  return this.favoritesService.isFavorite(productId);
}
  goBack() {
    this.router.navigate(['']);
  }
}