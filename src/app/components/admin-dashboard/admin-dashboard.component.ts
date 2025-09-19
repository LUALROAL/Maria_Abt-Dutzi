// components/admin-dashboard/admin-dashboard.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArtworkService } from '../../services/artwork.service';
import { Artwork } from '../../models/artwork.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  artworks: Artwork[] = [];
  newArtwork: Artwork = {
    id: 0,
    titulo: '',
    categoria: 'paisajismo',
    anio: new Date().getFullYear(),
    dimensiones: '',
    tecnica: '',
    imagen: '',
    descripcion: '',
    proceso: '',
    materiales: ''
  };
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private artworkService: ArtworkService,
    private authService: AuthService
  ) {
    this.loadArtworks();
  }

  loadArtworks(): void {
    this.artworks = this.artworkService.getAllArtworks();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.newArtwork.imagen = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      // Guardar la imagen en assets (en un caso real, se subiría a un servidor)
      this.saveImageToAssets();
    } else {
      this.artworkService.addArtwork({...this.newArtwork});
      this.resetForm();
      this.loadArtworks();
    }
  }

  private saveImageToAssets(): void {
    // En un entorno real, aquí se subiría la imagen a un servidor
    // Para este ejemplo, usamos la URL base64 directamente
    this.artworkService.addArtwork({...this.newArtwork});
    this.resetForm();
    this.loadArtworks();
  }

  private resetForm(): void {
    this.newArtwork = {
      id: 0,
      titulo: '',
      categoria: 'paisajismo',
      anio: new Date().getFullYear(),
      dimensiones: '',
      tecnica: '',
      imagen: '',
      descripcion: '',
      proceso: '',
      materiales: ''
    };
    this.selectedFile = null;
    this.previewUrl = null;
  }

  deleteArtwork(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta obra?')) {
      this.artworkService.deleteArtwork(id);
      this.loadArtworks();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
