import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalStateService } from '../../services/modal-state.service'; // Importar el servicio
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSwitcherComponent, TranslocoModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isAuthenticated = false;
  isHeaderVisible = true; // Nueva propiedad para controlar visibilidad
  private authSubscription!: Subscription;
  private modalStateSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private modalStateService: ModalStateService // Inyectar el servicio
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authStatus$.subscribe(
      status => this.isAuthenticated = status
    );

    // Suscribirse a cambios en el estado del modal
    this.modalStateSubscription = this.modalStateService.isModalOpen$.subscribe(
      isModalOpen => {
        this.isHeaderVisible = !isModalOpen;

        // Cerrar el menú móvil si está abierto cuando se abre el modal
        if (isModalOpen && this.isMenuOpen) {
          this.isMenuOpen = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.modalStateSubscription) {
      this.modalStateSubscription.unsubscribe();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
  }

  // Manejar la tecla ESC para cerrar el menú móvil
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}
