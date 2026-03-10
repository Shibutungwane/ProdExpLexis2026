import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { HeadingComponent } from "app/components/Heading/Heading.component";
import { FavoritesService } from 'app/services/favourate.service';
import {
  LucideAngularModule,
  Heart,Package,ArrowRight
} from 'lucide-angular';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  imports: [HeadingComponent,LucideAngularModule,RouterLink,CurrencyPipe]
})
export class FavoritesComponent  {
  icons = {
    Heart,Package,ArrowRight
  };
  constructor() { }
  private favoritesService = inject(FavoritesService);
  favoriteProducts = this.favoritesService.favorites;



  handleRemove(event: Event, product: any) {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggleFavorite(product);
  }

}
