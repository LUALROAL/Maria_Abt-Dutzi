// models/artwork.model.ts
export interface Artwork {
  id: number;
  titulo: string;
  categoria: string;
  anio: number;
  dimensiones: string;
  tecnica: string;
  imagen: string;
  descripcion: string;
  proceso: string;
  materiales: string;
}
