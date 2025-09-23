// components/gallery/gallery.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtworkCarouselComponent } from '../artwork-carousel/artwork-carousel.component';
import { ArtworkService } from '../../services/artwork.service';
import { Artwork } from '../../models/artwork.model';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ArtworkCarouselComponent, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  artworks: Artwork[] = [];
  filteredArtworks: Artwork[] = [];

  availableCategories: string[] = ['all', 'paisajismo', 'bodegones', 'retratos', 'animalismo', 'otros'];
  selectedCategories: string[] = ['all'];
  showDropdown: boolean = false;

  searchTerm: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private artworkService: ArtworkService) {}

  ngOnInit(): void {
    this.loadArtworks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.multiselect-container')) {
      this.showDropdown = false;
    }
  }

  loadArtworks(): void {
    this.subscription.add(
      this.artworkService.getAllArtworks().subscribe({
        next: (artworks: Artwork[]) => {
          this.artworks = artworks;
          this.applyFilters();
        },
        error: (error: any) => {
          console.error('Error loading artworks:', error);
        }
      })
    );
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  toggleCategory(category: string): void {
    if (category === 'all') {
      if (this.selectedCategories.includes('all')) {
        this.selectedCategories = [];
      } else {
        this.selectedCategories = ['all'];
      }
    } else {
      // Remover 'all' si se selecciona una categoría específica
      this.selectedCategories = this.selectedCategories.filter(c => c !== 'all');

      if (this.selectedCategories.includes(category)) {
        // Remover la categoría
        this.selectedCategories = this.selectedCategories.filter(c => c !== category);

        // Si no hay categorías seleccionadas, seleccionar 'all'
        if (this.selectedCategories.length === 0) {
          this.selectedCategories = ['all'];
        }
      } else {
        // Agregar la categoría
        this.selectedCategories.push(category);
      }
    }

    this.applyFilters();
  }

  selectAllCategories(): void {
    this.selectedCategories = ['all'];
    this.applyFilters();
  }

  clearSelection(): void {
    this.selectedCategories = ['all'];
    this.applyFilters();
  }

  getSelectedCategoriesText(): string {
    if (this.selectedCategories.includes('all') || this.selectedCategories.length === this.availableCategories.length - 1) {
      return 'Todas las categorías';
    }

    if (this.selectedCategories.length === 0) {
      return 'Seleccionar categorías';
    }

    if (this.selectedCategories.length === 1) {
      return this.selectedCategories[0];
    }

    return `${this.selectedCategories.length} categorías seleccionadas`;
  }

  applyFilters(): void {
    let filtered = this.artworks;

    // Filtrar por categorías seleccionadas
    if (!this.selectedCategories.includes('all') && this.selectedCategories.length > 0) {
      filtered = filtered.filter(artwork =>
        this.selectedCategories.includes(artwork.categoria.toLowerCase())
      );
    }

    // Filtrar por término de búsqueda
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(artwork =>
        artwork.titulo.toLowerCase().includes(term) ||
        (artwork.descripcion && artwork.descripcion.toLowerCase().includes(term)) ||
        artwork.tecnica.toLowerCase().includes(term)
      );
    }

    this.filteredArtworks = filtered;
  }

  // Mantener compatibilidad con el método existente
  searchObras(): void {
    this.applyFilters();
  }

  // Mantener compatibilidad con el método existente
  filterByCategory(category: string): void {
    this.selectedCategories = [category];
    this.applyFilters();
  }
}
