import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  LucideAngularModule,
  LayoutDashboard,
  Sparkles,
  ShoppingCart,
  Calendar,
  User,
  Clipboard,
  FileText,
  Table,
  ChevronDown,
  Undo2,
  Menu,
  Heart,
  Shield,ShoppingBag
} from 'lucide-angular';
import { RouterLink, RouterModule } from '@angular/router';
import { FavoritesService } from 'app/services/favourate.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [LucideAngularModule, RouterLink, RouterModule],
})
export class MenuComponent implements OnInit {
  icons = {
    LayoutDashboard,
    Sparkles,
    ShoppingCart,
    Calendar,
    User,
    Clipboard,
    FileText,
    Table,
    ChevronDown,
    Undo2,
    Menu,
    Heart,
    Shield,ShoppingBag
  };

  private favoritesService = inject(FavoritesService);
  

  favoritesCount = computed(() => this.favoritesService.favorites().length);

  isLoggedIn = signal(false);

  constructor() {
    
    
  }
  ngOnInit() {
     this.isLoggedIn.set( !!localStorage.getItem('accessToken'))
  }
}
