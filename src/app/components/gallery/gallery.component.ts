// components/gallery/gallery.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gallery3dComponent } from '../gallery3d/gallery3d.component';
import { ArtworkService } from '../../services/artwork.service';
import { Artwork } from '../../models/artwork.model';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, Gallery3dComponent, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  artworks: Artwork[] = [];
  filteredArtworks: Artwork[] = [];
  categories: string[] = ['all', 'paisajismo', 'bodegones', 'retratos', 'animalismo', 'otros'];
  activeCategory: string = 'all';
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
          this.filteredArtworks = artworks;
        },
        error: (error: any) => {
          console.error('Error loading artworks:', error);
        }
      })
    );
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;
    if (category === 'all') {
      this.loadArtworks();
    } else {
      this.subscription.add(
        this.artworkService.getArtworksByCategory(category).subscribe({
          next: (artworks: Artwork[]) => {
            this.artworks = artworks;
            this.filteredArtworks = artworks;
          },
          error: (error: any) => {
            console.error('Error filtering by category:', error);
          }
        })
      );
    }
  }

  searchObras(): void {
    let filtered = this.artworks;

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
}
