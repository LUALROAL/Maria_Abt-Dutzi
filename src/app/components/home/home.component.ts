// components/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { TechniquesComponent } from '../techniques/techniques.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeroComponent, TechniquesComponent, GalleryComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-techniques></app-techniques>
      <app-gallery></app-gallery>
    </main>
    <app-footer></app-footer>
  `
})
export class HomeComponent {}
