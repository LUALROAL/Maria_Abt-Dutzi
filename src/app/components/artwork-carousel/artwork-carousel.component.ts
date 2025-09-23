// components/artwork-carousel/artwork-carousel.component.ts
import { Component, Input, OnInit, HostListener } from '@angular/core';
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
  isModalOpen: boolean = false;
  isZoomed: boolean = false;
  showZoomIndicator: boolean = false;

  // Índices para las tarjetas adyacentes
  left2Index: number = 0;
  left1Index: number = 0;
  right1Index: number = 0;
  right2Index: number = 0;
   isMobile: boolean = false;

  ngOnInit() {
    this.updateCarousel(0);
     this.checkIfMobile();

       window.addEventListener('resize', () => this.checkIfMobile());
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
    this.isZoomed = false; // Reset zoom al cambiar de imagen

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

  // Modal methods
  openModal() {
    this.isModalOpen = true;
    this.isZoomed = false;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    this.isZoomed = false;
    document.body.style.overflow = '';
  }

  // Navegación dentro del modal
  nextInModal() {
    this.next();
    this.isZoomed = false; // Reset zoom al navegar
  }

  prevInModal() {
    this.prev();
    this.isZoomed = false; // Reset zoom al navegar
  }

  // Funcionalidad de zoom
  toggleZoom() {
    this.isZoomed = !this.isZoomed;

    if (this.isZoomed) {
      this.showZoomIndicator = true;
      setTimeout(() => {
        this.showZoomIndicator = false;
      }, 3000);
    }
  }

  // Cerrar modal con ESC key
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (this.isModalOpen) {
      if (this.isZoomed) {
        this.isZoomed = false; // Primero quitar zoom
      } else {
        this.closeModal();
      }
    }
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  handleRightArrow(event: KeyboardEvent) {
    if (this.isModalOpen) {
      this.nextInModal();
    }
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  handleLeftArrow(event: KeyboardEvent) {
    if (this.isModalOpen) {
      this.prevInModal();
    }
  }

  @HostListener('document:keydown.z', ['$event'])
  handleZKey(event: KeyboardEvent) {
    if (this.isModalOpen) {
      this.toggleZoom();
    }
  }

    checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }
}
