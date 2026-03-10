import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTS } from 'app/data/products.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return PRODUCTS.map(p => ({ id: p.id.toString() }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  }
];