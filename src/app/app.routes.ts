import { Routes } from '@angular/router';
import {authGuard} from './services/auth.guard'
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
  
      {
        path: '',
        loadComponent: () => import('./pages/catalog/catalog.component').then(m => m.CatalogComponent)
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./pages/productDetails/productDetails.component').then(m => m.ProductDetailsComponent)
      },

     
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent)
      },

    
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/Dashboard/Dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
      },

      
      { 
        path: 'login', 
        loadComponent: () => import('./Login/Login.component').then(m => m.LoginComponent) 
      },

      { 
        path: '**', 
        loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent) 
      },
    ],
  },
];
