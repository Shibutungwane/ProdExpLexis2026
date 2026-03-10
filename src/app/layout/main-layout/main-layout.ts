import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLink, RouterModule } from "@angular/router";
import { HeaderComponent } from '../../header/header.component';
import { MenuComponent } from '../../menu/menu.component';
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
} from 'lucide-angular';

@Component({
  selector: 'app-main-layout',
  imports: [LucideAngularModule, RouterOutlet, RouterLink, RouterModule, MenuComponent,HeaderComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
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
  };

  isMenuOpen = signal<boolean>(false);

  toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }
}
