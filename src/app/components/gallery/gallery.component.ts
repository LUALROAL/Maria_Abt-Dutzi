// components/gallery/gallery.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gallery3dComponent } from '../gallery3d/gallery3d.component';
import { ArtworkService } from '../../services/artwork.service';
import { Artwork } from '../../models/artwork.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, Gallery3dComponent, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  artworks: Artwork[] = [];
  filteredArtworks: Artwork[] = [];
  categories: string[] = ['all', 'paisajismo', 'bodegones', 'retratos', 'animalismo', 'otros'];
  activeCategory: string = 'all';
  searchTerm: string = '';

  constructor(private artworkService: ArtworkService) {}

  ngOnInit(): void {
    this.artworks = this.artworkService.getAllArtworks();
    this.filteredArtworks = this.artworks;
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;
    this.applyFilters();
  }

  searchObras(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.artworks;

    // Filtrar por categoría
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(artwork => artwork.categoria === this.activeCategory);
    }

    // Filtrar por término de búsqueda
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(artwork =>
        artwork.titulo.toLowerCase().includes(term) ||
        artwork.descripcion.toLowerCase().includes(term) ||
        artwork.tecnica.toLowerCase().includes(term)
      );
    }

    this.filteredArtworks = filtered;
  }
}
