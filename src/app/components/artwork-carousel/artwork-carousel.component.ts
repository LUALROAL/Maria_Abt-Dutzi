// components/artwork-carousel/artwork-carousel.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artwork } from '../../models/artwork.model';

@Component({
  selector: 'app-artwork-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artwork-carousel.component.html',
  styleUrls: ['./artwork-carousel.component.scss']
})
export class ArtworkCarouselComponent implements OnInit {
  @Input() artworks: Artwork[] = [];

  currentIndex: number = 0;
  currentArtwork: Artwork | null = null;

  // Índices para las tarjetas adyacentes
  left2Index: number = 0;
  left1Index: number = 0;
  right1Index: number = 0;
  right2Index: number = 0;

  ngOnInit() {
    this.updateCarousel(0);
  }

  ngOnChanges() {
    if (this.artworks.length > 0) {
      this.updateCarousel(this.currentIndex);
    }
  }

  updateCarousel(newIndex: number) {
    const total = this.artworks.length;
    this.currentIndex = (newIndex + total) % total;
    this.currentArtwork = this.artworks[this.currentIndex];

    // Calcular índices adyacentes
    this.left2Index = (this.currentIndex - 2 + total) % total;
    this.left1Index = (this.currentIndex - 1 + total) % total;
    this.right1Index = (this.currentIndex + 1) % total;
    this.right2Index = (this.currentIndex + 2) % total;
  }

  isHidden(index: number): boolean {
    const total = this.artworks.length;
    const positions = [
      this.currentIndex,
      this.left1Index,
      this.left2Index,
      this.right1Index,
      this.right2Index
    ];
    return !positions.includes(index);
  }

  next() {
    this.updateCarousel(this.currentIndex + 1);
  }

  prev() {
    this.updateCarousel(this.currentIndex - 1);
  }

  goToSlide(index: number) {
    this.updateCarousel(index);
  }
}
