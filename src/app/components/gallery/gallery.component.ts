// components/gallery/gallery.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selectedCategory: string = 'all';
  searchTerm: string = '';

  private subscription: Subscription = new Subscription();

  constructor(private artworkService: ArtworkService) {}

  ngOnInit(): void {
    this.loadArtworks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  getCategoryButtonClass(category: string): string {
    const baseClasses = "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300";

    if (this.selectedCategory === category) {
      return `${baseClasses} bg-primary text-white shadow-lg transform hover:scale-105`;
    } else {
      return `${baseClasses} bg-white/80 backdrop-blur-sm text-primary-dark border border-accent hover:bg-primary/10 hover:border-primary/30`;
    }
  }

  getCategoryDisplayName(category: string): string {
    const names: { [key: string]: string } = {
      'all': 'Todas las Obras',
      'paisajismo': 'Paisajismo',
      'bodegones': 'Bodegones',
      'retratos': 'Retratos',
      'animalismo': 'Animalismo',
      'otros': 'Otras Obras'
    };
    return names[category] || category;
  }

  applyFilters(): void {
    let filtered = this.artworks;

    // Filtrar por categoría seleccionada
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(artwork =>
        artwork.categoria.toLowerCase() === this.selectedCategory
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

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.searchTerm = '';
    this.applyFilters();
  }

  // Mantener compatibilidad
  searchObras(): void {
    this.applyFilters();
  }
}
