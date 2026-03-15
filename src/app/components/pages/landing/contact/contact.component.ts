import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  contact = {
    phone: '91 914 62 98',
    phoneLink: 'tel:+34919146298',
    email: 'afernandez@stratpharma.com',
    instagram: '@stratpharma_iberia',
    instagramUrl: 'https://www.instagram.com/stratpharma_iberia/',
    address: 'P.º de la Castellana, 216, Chamartín, 28046 Madrid',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=40.4668927,-3.6884653'
  };

  /** URL de embed de Google Maps (coordenadas del lugar que compartiste) */
  mapEmbedUrl: string | null = 'https://www.google.com/maps?q=40.4668927,-3.6884653&hl=es&z=17&output=embed';

  constructor(private sanitizer: DomSanitizer) {}

  get safeMapUrl(): SafeResourceUrl | null {
    return this.mapEmbedUrl
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.mapEmbedUrl)
      : null;
  }
}
