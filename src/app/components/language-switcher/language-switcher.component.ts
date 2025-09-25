import { Component, OnInit, HostListener } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LanguageSwitcherComponent implements OnInit {
  availableLangs: string[] = [];
  activeLang: string;
  showDropdown = false;

  constructor(private translocoService: TranslocoService) {
    this.activeLang = this.translocoService.getActiveLang();
  }

  ngOnInit(): void {
    this.availableLangs = this.translocoService.getAvailableLangs() as string[];
  }

  getFlag(lang: string): string {
    const flags: { [key: string]: string } = {
      'de': '🇩🇪',
      'en': '🇺🇸',
      'es': '🇪🇸',
    };
    return flags[lang] || '🌐';
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  changeLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang = lang;
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-switcher')) {
      this.showDropdown = false;
    }
  }
}
