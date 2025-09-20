// components/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArtworkService } from '../../services/artwork.service';
import { AuthService } from '../../services/auth.service';
import { Artwork } from '../../models/artwork.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  artworks: Artwork[] = [];
  newArtwork: Artwork = {
    id: 0,
    titulo: '',
    medidas: '',
    tecnica: '',
    estilo: '',
    genero: '',
    descripcion: '',
    estado: '',
    precio: 0,
    moneda: 'EUR',
    imagen: '',
    anio: new Date().getFullYear()
  };
  editingArtwork: Artwork | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private artworkService: ArtworkService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadArtworks();
  }

  loadArtworks(): void {
    this.artworks = this.artworkService.getAllArtworks();
  }

  onSubmit(): void {
    try {
      if (this.editingArtwork) {
        // Modo edición
        this.artworkService.updateArtwork({...this.newArtwork});
        this.successMessage = 'Obra actualizada correctamente';
      } else {
        // Modo creación
        this.artworkService.addArtwork({...this.newArtwork});
        this.successMessage = 'Obra agregada correctamente';
      }

      this.resetForm();
      this.loadArtworks();

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } catch (error) {
      this.errorMessage = 'Error al guardar la obra';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  }

  editArtwork(artwork: Artwork): void {
    this.editingArtwork = artwork;
    this.newArtwork = {...artwork};
  }

  deleteArtwork(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta obra?')) {
      this.artworkService.deleteArtwork(id);
      this.loadArtworks();
      this.successMessage = 'Obra eliminada correctamente';
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }

  resetForm(): void {
    this.newArtwork = {
      id: 0,
      titulo: '',
      medidas: '',
      tecnica: '',
      estilo: '',
      genero: '',
      descripcion: '',
      estado: '',
      precio: 0,
      moneda: 'EUR',
      imagen: '',
      anio: new Date().getFullYear()
    };
    this.editingArtwork = null;
  }

  cancelEdit(): void {
    this.resetForm();
  }
}
