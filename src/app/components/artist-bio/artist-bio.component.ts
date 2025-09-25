// components/artist-bio/artist-bio.component.ts
import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-artist-bio',
  standalone: true,
  imports: [TranslocoModule, HeaderComponent],
  templateUrl: './artist-bio.component.html',
  styleUrls: ['./artist-bio.component.scss']
})
export class ArtistBioComponent {}
