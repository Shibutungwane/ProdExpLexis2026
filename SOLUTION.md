
# Solution: Angular — LexisNexis Product Catalog

## Overview

This project implements client-side routing for a product catalog application using **Angular V21.2.0**. The app features four distinct views connected through a shared navigation layout, including a parameterized route for product details and a guarded route for admin access.

---

## Architecture

```
src/
  app/
	Pages/
    ├── /                    → CatalogPage         (default home)
    ├── /product/:id         → ProductDetailsPage   (parameterized)
    ├── /favorites           → FavoritesPage
    └── /login               → RouteGuard → AdminPage (guarded)
```

### File Structure

```
├──                   
├── Layout/main-layout  # Layout shell — defines all routes
├── components/
│   ├── menu        # sidebar nav  with NavLink active states
│   ├── header        # Main application Header
│   ├── heading        # Main pages Title and subheading componets
│   ├── menu        # sidebar nav  with NavLink active states
│   
├── services/
│   ├── auth.service.ts       
│   ├── favourite.service        # 
│   ├── auth.guard.ts        # Auth guard wrapper for protected routes
│   │   

├── pages/
│   ├── CatalogPage        # Product grid with links to detail pages
│   ├── ProductDetailsPage # Single product view (useParams)
│   ├── FavoritesPage      # Favorites with empty state
│   ├── AdminPage      # admin Login page for system access
│   └── Dashboard          # Admin dashboard (stats + orders table)
├── data/
│   └── products.data.ts       # Mock product data + TypeScript interface

```

---

