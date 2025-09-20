// services/artwork.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Artwork } from '../models/artwork.model';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private artworks: Artwork[] = [];
  private readonly STORAGE_KEY = 'artworks';
  private readonly DATA_URL = 'assets/data/artworks.json';

  constructor(private http: HttpClient) {
    this.loadArtworks();
  }

  private loadArtworks(): void {
    const storedArtworks = localStorage.getItem(this.STORAGE_KEY);
    if (storedArtworks) {
      this.artworks = JSON.parse(storedArtworks);
    } else {
      this.loadInitialData().subscribe({
        next: (data) => {
          this.artworks = data;
          this.saveArtworks();
        },
        error: (error) => {
          console.error('Error loading initial data:', error);
          this.artworks = this.getFallbackArtworks();
          this.saveArtworks();
        }
      });
    }
  }

  private loadInitialData(): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(this.DATA_URL).pipe(
      catchError(error => {
        console.error('Error loading artworks from JSON:', error);
        return of(this.getFallbackArtworks());
      })
    );
  }

  private getFallbackArtworks(): Artwork[] {
    return [
      {
        "id": 1,
        "titulo": "Selva al amanecer",
        "medidas": "80x60 cm",
        "tecnica": "Óleo sobre lienzo",
        "genero": "Paisajismo",
        "estado": "Nuevo",
        "precio": 850,
        "moneda": "EUR",
        "imagen": "https://res.cloudinary.com/dvdscvipo/image/upload/v1758381333/Labrador-001_v0vzd9.jpg",
        "descripcion": "Esta obra captura la esencia del amanecer en las montañas, con juegos de luz y sombra que crean una atmósfera mágica.",
        anio: 0
      }
      ];
  }

  private saveArtworks(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.artworks));
  }

  getAllArtworks(): Artwork[] {
    return this.artworks;
  }

  getArtworksByCategory(category: string): Artwork[] {
    if (category === 'all') {
      return this.artworks;
    }
    return this.artworks.filter(artwork => artwork.genero === category);
  }

  getArtworkById(id: number): Artwork | undefined {
    return this.artworks.find(artwork => artwork.id === id);
  }

  addArtwork(artwork: Artwork): void {
    // Generar un ID único
    artwork.id = this.generateId();
    this.artworks.push(artwork);
    this.saveArtworks();
  }

  updateArtwork(updatedArtwork: Artwork): void {
    const index = this.artworks.findIndex(artwork => artwork.id === updatedArtwork.id);
    if (index !== -1) {
      this.artworks[index] = updatedArtwork;
      this.saveArtworks();
    }
  }

  deleteArtwork(id: number): void {
    this.artworks = this.artworks.filter(artwork => artwork.id !== id);
    this.saveArtworks();
  }

  private generateId(): number {
    return this.artworks.length > 0
      ? Math.max(...this.artworks.map(artwork => artwork.id)) + 1
      : 1;
  }

  // Método para cargar imágenes (si es necesario)
  loadImage(imagePath: string): Observable<string> {
    return this.http.get(imagePath, { responseType: 'blob' }).pipe(
      map(blob => URL.createObjectURL(blob)),
      catchError(error => {
        console.error('Error loading image:', error);
        return of('assets/images/placeholder.jpg'); // Imagen de respaldo
      })
    );
  }
}
