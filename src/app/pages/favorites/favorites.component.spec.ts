import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from 'app/services/favourate.service';
import { HeadingComponent } from 'app/Heading/Heading.component';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  const mockFavoritesService = {
    favorites: [{ id: 1, name: 'Product 1' }],
    toggleFavorite: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FavoritesComponent, // standalone component
        HeadingComponent,
        LucideAngularModule,
        RouterLink,
        CurrencyPipe
      ],
      providers: [
        { provide: FavoritesService, useValue: mockFavoritesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize favoriteProducts from service', () => {
    expect(component.favoriteProducts).toBe(mockFavoritesService.favorites);
    expect(component.favoriteProducts.length).toBe(1);
  });

  it('should call toggleFavorite when handleRemove is triggered', () => {
    const fakeEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn()
    } as unknown as Event;

    const product = { id: 1, name: 'Product 1' };

    component.handleRemove(fakeEvent, product);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    expect(mockFavoritesService.toggleFavorite).toHaveBeenCalledWith(product);
  });
});