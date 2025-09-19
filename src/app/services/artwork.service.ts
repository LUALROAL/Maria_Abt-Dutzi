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
      // PAISAJISMO
      {
        id: 1,
        titulo: "Selva al amanecer",
        categoria: "paisajismo",
        anio: 2022,
        dimensiones: "80x60 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/paisajismo/selva.jpg",
        descripcion: "Esta obra captura la esencia del amanecer en las montañas, con juegos de luz y sombra que crean una atmósfera mágica.",
        proceso: "Pintado alla prima, con capas de color aplicadas directamente sobre el lienzo sin dibujo preparatorio previo.",
        materiales: "Óleos de alta calidad sobre lienzo de lino, utilizando pinceles de pelo de marta y cerda."
      },
      {
        id: 2,
        titulo: "Desierto en la tarde",
        categoria: "paisajismo",
        anio: 2022,
        dimensiones: "80x60 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/paisajismo/desierto.jpg",
        descripcion: "Esta obra captura la esencia del amanecer en las montañas, con juegos de luz y sombra que crean una atmósfera mágica.",
        proceso: "Pintado alla prima, con capas de color aplicadas directamente sobre el lienzo sin dibujo preparatorio previo.",
        materiales: "Óleos de alta calidad sobre lienzo de lino, utilizando pinceles de pelo de marta y cerda."
      },
      {
        id: 3,
        titulo: "Pueblo al atardecer",
        categoria: "paisajismo",
        anio: 2022,
        dimensiones: "80x60 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/paisajismo/pueblo.jpg",
        descripcion: "Esta obra captura la esencia del amanecer en las montañas, con juegos de luz y sombra que crean una atmósfera mágica.",
        proceso: "Pintado alla prima, con capas de color aplicadas directamente sobre el lienzo sin dibujo preparatorio previo.",
        materiales: "Óleos de alta calidad sobre lienzo de lino, utilizando pinceles de pelo de marta y cerda."
      },
      {
        id: 4,
        titulo: "Catedral Pasto",
        categoria: "paisajismo",
        anio: 2022,
        dimensiones: "80x60 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/paisajismo/catedral.jpg",
        descripcion: "Esta obra captura la esencia del amanecer en las montañas, con juegos de luz y sombra que crean una atmósfera mágica.",
        proceso: "Pintado alla prima, con capas de color aplicadas directamente sobre el lienzo sin dibujo preparatorio previo.",
        materiales: "Óleos de alta calidad sobre lienzo de lino, utilizando pinceles de pelo de marta y cerda."
      },
      {
        id: 5,
        titulo: "Navidad en el pueblo",
        categoria: "paisajismo",
        anio: 2022,
        dimensiones: "80x60 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/paisajismo/navidad.jpg",
        descripcion: "Esta obra captura la esencia del amanecer en las montañas, con juegos de luz y sombra que crean una atmósfera mágica.",
        proceso: "Pintado alla prima, con capas de color aplicadas directamente sobre el lienzo sin dibujo preparatorio previo.",
        materiales: "Óleos de alta calidad sobre lienzo de lino, utilizando pinceles de pelo de marta y cerda."
      },
      {
        id: 6,
        titulo: "Noche",
        categoria: "paisajismo",
        anio: 2022,
        dimensiones: "80x60 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/paisajismo/noche.jpg",
        descripcion: "Esta obra captura la esencia del amanecer en las montañas, con juegos de luz y sombra que crean una atmósfera mágica.",
        proceso: "Pintado alla prima, con capas de color aplicadas directamente sobre el lienzo sin dibujo preparatorio previo.",
        materiales: "Óleos de alta calidad sobre lienzo de lino, utilizando pinceles de pelo de marta и cerda."
      },

      // ANIMALISMO
      {
        id: 7,
        titulo: "Panteras en la selva",
        categoria: "animalismo",
        anio: 2022,
        dimensiones: "70x90 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/animalismo/panteras.jpg",
        descripcion: "Estudio de la luz natural en su momento más intenso del día.",
        proceso: "Técnica impresionista con pinceladas visibles que capturan el efecto de la luz.",
        materiales: "Óleos sobre lienzo de lino, con pinceles de cerda para texturas marcadas."
      },
      {
        id: 8,
        titulo: "Pez en el agua",
        categoria: "animalismo",
        anio: 2022,
        dimensiones: "70x90 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/animalismo/pez.jpg",
        descripcion: "Estudio de la luz natural en su momento más intenso del día.",
        proceso: "Técnica impresionista con pinceladas visibles que capturan el efecto de la luz.",
        materiales: "Óleos sobre lienzo de lino, con pinceles de cerda para texturas marcadas."
      },
      {
        id: 9,
        titulo: "Cisnes en el agua",
        categoria: "animalismo",
        anio: 2022,
        dimensiones: "70x90 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/animalismo/cisnes.jpg",
        descripcion: "Estudio de la luz natural en su momento más intenso del día.",
        proceso: "Técnica impresionista con pinceladas visibles que capturan el efecto de la luz.",
        materiales: "Óleos sobre lienzo de lino, con pinceles de cerda para texturas marcadas."
      },
      {
        id: 10,
        titulo: "El tigre",
        categoria: "animalismo",
        anio: 2022,
        dimensiones: "70x90 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/animalismo/tigre.jpg",
        descripcion: "Estudio de la luz natural en su momento más intenso del día.",
        proceso: "Técnica impresionista con pinceladas visibles que capturan el efecto de la luz.",
        materiales: "Óleos sobre lienzo de lino, con pinceles de cerda para texturas marcadas."
      },
      {
        id: 11,
        titulo: "Guacamayas en la selva",
        categoria: "animalismo",
        anio: 2022,
        dimensiones: "70x90 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/animalismo/guacamayas.jpg",
        descripcion: "Estudio de la luz natural en su momento más intenso del día.",
        proceso: "Técnica impresionista con pinceladas visibles que capturan el efecto de la luz.",
        materiales: "Óleos sobre lienzo de lino, con pinceles de cerda para texturas marcadas."
      },
      {
        id: 12,
        titulo: "Pez Colorido",
        categoria: "animalismo",
        anio: 2022,
        dimensiones: "70x90 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/animalismo/pez-colorido.jpg",
        descripcion: "Estudio de la luz natural en su momento más intenso del día.",
        proceso: "Técnica impresionista con pinceladas visibles que capturan el efecto de la luz.",
        materiales: "Óleos sobre lienzo de lino, con pinceles de cerda para texturas marcadas."
      },
      {
        id: 13,
        titulo: "Libélula",
        categoria: "animalismo",
        anio: 2022,
        dimensiones: "70x90 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/animalismo/libelula.jpg",
        descripcion: "Estudio de la luz natural en su momento más intenso del día.",
        proceso: "Técnica impresionista con pinceladas visibles que capturan el efecto de la luz.",
        materiales: "Óleos sobre lienzo de lino, con pinceles de cerda para texturas marcadas."
      },
      {
        id: 14,
        titulo: "Mariposas",
        categoria: "animalismo",
        anio: 2022,
        dimensiones: "70x90 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/animalismo/mariposas.jpg",
        descripcion: "Estudio de la luz natural en su momento más intenso del día.",
        proceso: "Técnica impresionista con pinceladas visibles que capturan el efecto de la luz.",
        materiales: "Óleos sobre lienzo de lino, con pinceles de cerda para texturas marcadas."
      },
      {
        id: 15,
        titulo: "Tigre",
        categoria: "animalismo",
        anio: 2022,
        dimensiones: "70x90 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/animalismo/tigre-2.jpg",
        descripcion: "Estudio de la luz natural en su momento más intenso del día.",
        proceso: "Técnica impresionista con pinceladas visibles que capturan el efecto de la luz.",
        materiales: "Óleos sobre lienzo de lino, con pinceles de cerda para texturas marcadas."
      },
      {
        id: 16,
        titulo: "León en la sabana",
        categoria: "animalismo",
        anio: 2022,
        dimensiones: "70x90 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/animalismo/leon.jpg",
        descripcion: "Estudio de la luz natural en su momento más intenso del día.",
        proceso: "Técnica impresionista con pinceladas visibles que capturan el efecto de la luz.",
        materiales: "Óleos sobre lienzo de lino, con pinceles de cerda para texturas marcadas."
      },
      {
        id: 17,
        titulo: "Flamencos",
        categoria: "animalismo",
        anio: 2022,
        dimensiones: "70x90 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/animalismo/flamencos.jpg",
        descripcion: "Estudio de la luz natural en su momento más intenso del día.",
        proceso: "Técnica impresionista con pinceladas visibles que capturan el efecto de la luz.",
        materiales: "Óleos sobre lienzo de lino, con pinceles de cerda para texturas marcadas."
      },

      // RETRATOS
      {
        id: 18,
        titulo: "Retrato de mujer con sombrero rojo",
        categoria: "retratos",
        anio: 2023,
        dimensiones: "60x80 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/retratos/sombrero-rojo.jpg",
        descripcion: "Retrato íntimo que captura la personalidad y expresión única de la modelo.",
        proceso: "Trabajo de capas con énfasis en la captura de la luz sobre los rasgos faciales.",
        materiales: "Óleos sobre lienzo de lino, utilizando pinceles finos de pelo de marta para los detalles."
      },
      {
        id: 19,
        titulo: "Retrato de mujer árabe",
        categoria: "retratos",
        anio: 2023,
        dimensiones: "60x80 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/retratos/mujer-arabe.jpg",
        descripcion: "Retrato íntimo que captura la personalidad y expresión única de la modelo.",
        proceso: "Trabajo de capas con énfasis en la captura de la luz sobre los rasgos faciales.",
        materiales: "Óleos sobre lienzo de lino, utilizando pinceles finos de pelo de marta para los detalles."
      },
      {
        id: 20,
        titulo: "Retrato de sirena",
        categoria: "retratos",
        anio: 2023,
        dimensiones: "60x80 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/retratos/sirena.jpg",
        descripcion: "Retrato íntimo que captura la personalidad y expresión única de la modelo.",
        proceso: "Trabajo de capas con énfasis en la captura de la luz sobre los rasgos faciales.",
        materiales: "Óleos sobre lienzo de lino, utilizando pinceles finos de pelo de marta para los detalles."
      },
      {
        id: 21,
        titulo: "Retrato de ángel",
        categoria: "retratos",
        anio: 2023,
        dimensiones: "60x80 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/retratos/angel.jpg",
        descripcion: "Retrato íntimo que captura la personalidad y expresión única de la modelo.",
        proceso: "Trabajo de capas con énfasis en la captura de la luz sobre los rasgos faciales.",
        materiales: "Óleos sobre lienzo de lino, utilizando pinceles finos de pelo de marta para los detalles."
      },
      {
        id: 22,
        titulo: "Retrato de ángel",
        categoria: "retratos",
        anio: 2023,
        dimensiones: "60x80 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/retratos/angel-2.jpg",
        descripcion: "Retrato íntimo que captura la personalidad y expresión única de la modelo.",
        proceso: "Trabajo de capas con énfasis en la captura de la luz sobre los rasgos faciales.",
        materiales: "Óleos sobre lienzo de lino, utilizando pinceles finos de pelo de marta para los detalles."
      },
      {
        id: 23,
        titulo: "Retrato de mujer desnuda",
        categoria: "retratos",
        anio: 2023,
        dimensiones: "60x80 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/retratos/mujer-desnuda.jpg",
        descripcion: "Retrato íntimo que captura la personalidad y expresión única de la modelo.",
        proceso: "Trabajo de capas con énfasis en la captura de la luz sobre los rasgos faciales.",
        materiales: "Óleos sobre lienzo de lino, utilizando pinceles finos de pelo de marta para los detalles."
      },
      {
        id: 24,
        titulo: "Retrato de la Virgen",
        categoria: "retratos",
        anio: 2023,
        dimensiones: "60x80 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/retratos/virgen-1.jpg",
        descripcion: "Retrato íntimo que captura la personalidad y expresión única de la modelo.",
        proceso: "Trabajo de capas con énfasis en la captura de la luz sobre los rasgos faciales.",
        materiales: "Óleos sobre lienzo de lino, utilizando pinceles finos de pelo de marta para los detalles."
      },
      {
        id: 25,
        titulo: "Retrato de la Virgen",
        categoria: "retratos",
        anio: 2023,
        dimensiones: "60x80 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/retratos/virgen-2.jpg",
        descripcion: "Retrato íntimo que captura la personalidad y expresión única de la modelo.",
        proceso: "Trabajo de capas con énfasis en la captura de la luz sobre los rasgos faciales.",
        materiales: "Óleos sobre lienzo de lino, utilizando pinceles finos de pelo de marta para los detalles."
      },
      {
        id: 26,
        titulo: "Retrato de Jesus",
        categoria: "retratos",
        anio: 2023,
        dimensiones: "60x80 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/retratos/jesus.jpg",
        descripcion: "Retrato íntimo que captura la personalidad y expresión única de la modelo.",
        proceso: "Trabajo de capas con énfasis en la captura de la luz sobre los rasgos faciales.",
        materiales: "Óleos sobre lienzo de lino, utilizando pinceles finos de pelo de marta para los detalles."
      },

      // BODEGONES
      {
        id: 27,
        titulo: "Rosa y azul",
        categoria: "bodegones",
        anio: 2021,
        dimensiones: "50x70 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/bodegones/rosa-azul.jpg",
        descripcion: "Bodegón clásico con composición equilibrada y colores vibrantes que realzan la textura de las frutas.",
        proceso: "Técnica de veladuras superpuestas para lograr profundidad y realismo en las texturas.",
        materiales: "Óleos sobre lienzo de algodón, con pinceles de pelo sintético y natural."
      },
      {
        id: 28,
        titulo: "Rosa y azul",
        categoria: "bodegones",
        anio: 2021,
        dimensiones: "50x70 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/bodegones/flor-roja.jpg",
        descripcion: "Bodegón clásico con composición equilibrada y colores vibrantes que realzan la textura de las frutas.",
        proceso: "Técnica de veladuras superpuestas para lograr profundidad y realismo en las texturas.",
        materiales: "Óleos sobre lienzo de algodón, con pinceles de pelo sintético y natural."
      },
      {
        id: 29,
        titulo: "Rosa",
        categoria: "bodegones",
        anio: 2021,
        dimensiones: "50x70 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/bodegones/rosa.jpg",
        descripcion: "Bodegón clásico con composición equilibrada y colores vibrantes que realzan la textura de las frutas.",
        proceso: "Técnica de veladuras superpuestas para lograr profundidad y realismo en las texturas.",
        materiales: "Óleos sobre lienzo de algodón, con pinceles de pelo sintético y natural."
      },
      {
        id: 30,
        titulo: "Orquídea",
        categoria: "bodegones",
        anio: 2021,
        dimensiones: "50x70 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/bodegones/orquidea.jpg",
        descripcion: "Bodegón clásico con composición equilibrada y colores vibrantes que realzan la textura de las frutas.",
        proceso: "Técnica de veladuras superpuestas para lograr profundidad y realismo en las texturas.",
        materiales: "Óleos sobre lienzo de algodón, con pinceles de pelo sintético y natural."
      },
      {
        id: 31,
        titulo: "Orquídea",
        categoria: "bodegones",
        anio: 2021,
        dimensiones: "50x70 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/bodegones/orquidea-2.jpg",
        descripcion: "Bodegón clásico con composición equilibrada y colores vibrantes que realzan la textura de las frutas.",
        proceso: "Técnica de veladuras superpuestas para lograr profundidad y realismo en las texturas.",
        materiales: "Óleos sobre lienzo de algodón, con pinceles de pelo sintético y natural."
      },

      // OTROS
      {
        id: 32,
        titulo: "Reflejos urbanos",
        categoria: "otros",
        anio: 2021,
        dimensiones: "80x120 cm",
        tecnica: "Óleo sobre lienzo",
        imagen: "assets/images/gallery/otros/aguila-sueno.jpg",
        descripcion: "Visión personal de la ciudad a través de sus reflejos y superficies.",
        proceso: "Superposición de capas transparentes para lograr efectos de profundidad y reflexión.",
        materiales: "Óleos y medios de transparencia sobre lienzo de lino."
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
    return this.artworks.filter(artwork => artwork.categoria === category);
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
