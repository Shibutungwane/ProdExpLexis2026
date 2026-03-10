import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FavoritesService } from './favourate.service';
import { PLATFORM_ID } from '@angular/core';

describe('FavoritesService', () => {
  let service: FavoritesService;
  const mockLocalStorage: Record<string, string> = {};

  beforeEach(() => {
    // Mock localStorage
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => mockLocalStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => { mockLocalStorage[key] = value; }),
      removeItem: vi.fn((key: string) => { delete mockLocalStorage[key]; }),
      clear: vi.fn(() => { Object.keys(mockLocalStorage).forEach(k => delete mockLocalStorage[k]); }),
    });

    service = new FavoritesService();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.favorites()).toEqual([]);
  });

  it('should add a product when toggling a non-favorite', () => {
    const product = { id: 1, name: 'Product 1' };
    service.toggleFavorite(product);

    expect(service.favorites()).toEqual([product]);
    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([product]));
    expect(service.isFavorite(1)).toBe(true);
  });

  it('should remove a product when toggling an existing favorite', () => {
    const product = { id: 1, name: 'Product 1' };
    service.toggleFavorite(product); // add first
    service.toggleFavorite(product); // remove

    expect(service.favorites()).toEqual([]);
    expect(service.isFavorite(1)).toBe(false);
  });

  it('should handle multiple products correctly', () => {
    const product1 = { id: 1, name: 'Product 1' };
    const product2 = { id: 2, name: 'Product 2' };

    service.toggleFavorite(product1);
    service.toggleFavorite(product2);

    expect(service.favorites()).toEqual([product1, product2]);
    expect(service.isFavorite(1)).toBe(true);
    expect(service.isFavorite(2)).toBe(true);
  });

  it('should not duplicate products', () => {
    const product = { id: 1, name: 'Product 1' };
    service.toggleFavorite(product);
    service.toggleFavorite(product); // remove
    service.toggleFavorite(product); // add again

    expect(service.favorites()).toEqual([product]);
  });

  it('should update localStorage on effect', () => {
    const product = { id: 3, name: 'Product 3' };
    service.toggleFavorite(product);

    const stored = JSON.parse(localStorage.getItem('favorites')!);
    expect(stored).toEqual([product]);
  });
});