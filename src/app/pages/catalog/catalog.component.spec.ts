import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { ProductDetailsService } from '../productDetails/productDetails.service';
import { FavoritesService } from 'app/services/favourate.service';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { of, throwError } from 'rxjs';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  const mockProducts = [
    { id: 1, title: 'Product One', category: 'Category A' },
    { id: 2, title: 'Product Two', category: 'Category B' },
  ];

  const mockProductDetailsService = {
    getProducts: vi.fn(() => of(mockProducts)),
  };

  const mockFavoritesService = {
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogComponent, LucideAngularModule, RouterLink, CurrencyPipe],
      providers: [
        { provide: ProductDetailsService, useValue: mockProductDetailsService },
        { provide: FavoritesService, useValue: mockFavoritesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize signals correctly', () => {
    expect(component.productData()).toEqual([]);
    expect(component.searchQuery()).toBe('');
    expect(component.favorites()).toEqual(JSON.parse(localStorage.getItem('favorites') || '[]'));
  });

  it('should load products on ngOnInit', () => {
    component.ngOnInit();
    expect(mockProductDetailsService.getProducts).toHaveBeenCalled();
    expect(component.productData()).toEqual(mockProducts);
  });

  it('should filter products based on searchQuery', () => {
    component.productData.set(mockProducts);

    // empty query returns all
    component.searchQuery.set('');
    expect(component.filteredProduct()).toEqual(mockProducts);

    // filter by title
    component.searchQuery.set('one');
    expect(component.filteredProduct()).toEqual([mockProducts[0]]);

    // filter by category
    component.searchQuery.set('Category B');
    expect(component.filteredProduct()).toEqual([mockProducts[1]]);
  });

  it('should update searchQuery on onSearch', () => {
    const fakeEvent = { target: { value: 'Test' } } as unknown as Event;
    component.onSearch(fakeEvent);
    expect(component.searchQuery()).toBe('Test');
  });

  it('should call toggleFavorite on addToFavorite', () => {
    const fakeEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as Event;

    const product = mockProducts[0];
    component.addToFavorite(fakeEvent, product);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    expect(mockFavoritesService.toggleFavorite).toHaveBeenCalledWith(product);
  });

  it('should return correct favorite status from isFavorite', () => {
    mockFavoritesService.isFavorite.mockReturnValue(true);
    expect(component.isFavorite(1)).toBe(true);
    expect(mockFavoritesService.isFavorite).toHaveBeenCalledWith(1);
  });
});