// models/artwork.model.ts
export interface Artwork {
  id: number;
  titulo: string;
  medidas: string;
  tecnica: string;
  estilo?: string;
  genero: string;
  descripcion?: string;
  estado: string;
  precio: number;
  moneda: string;
  imagen: string;
  anio: number;
}
