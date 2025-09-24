
import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { AvaliableLanguages, AvaliablesLanguages } from '../../utils/translate/transloco-config';
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

  constructor(private translocoService: TranslocoService) {
    this.activeLang = this.translocoService.getActiveLang();
  }

  ngOnInit(): void {
    this.availableLangs = this.translocoService.getAvailableLangs() as string[];
  }

  changeLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang = lang;
  }
}
