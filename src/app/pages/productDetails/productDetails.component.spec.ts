import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductDetailsComponent } from './productDetails.component';
import { ProductDetailsService } from './productDetails.service';
import { FavoritesService } from 'app/services/favourate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from './productDetails.module';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockRouter = {
    navigate: vi.fn(),
  };

  const mockFavoritesService = {
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(),
  };

  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 100 } as Product,
    { id: 2, name: 'Product 2', price: 200 } as Product,
  ];

  const mockProductDetailsService = {
    getProducts: vi.fn(() => of(mockProducts)),
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: vi.fn(() => '1'),
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [
        { provide: ProductDetailsService, useValue: mockProductDetailsService },
        { provide: FavoritesService, useValue: mockFavoritesService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set id from route on ngOnInit', () => {
    component.ngOnInit();
    expect(component.id()).toBe('1');
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
  });

  it('should set product signal from productDetails service', () => {
    component.ngOnInit();
    expect(component.product()).toEqual(mockProducts[0]);
  });

  it('should call toggleFavorite when addToFavorite is triggered', () => {
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

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });
});