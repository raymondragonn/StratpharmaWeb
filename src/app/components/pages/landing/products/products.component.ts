import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: ProductItem[] = [
    {
      id: '1',
      title: 'Strata-triz',
      description:
        'Gel de silicona para el tratamiento de cicatrices nuevas y antiguas.',
      imageUrl: 'assets/img/products/strata-triz/imgi_44_ST-5-ES-Box-HighRes.jpg'
    },
    {
      id: '4',
      title: 'Stratamark',
      description: 'Gel de silicona formulado para la prevención y el tratamiento de las estrías.',
      imageUrl: 'assets/img/products/stratamark/imgi_43_SK20EX00TubeBoxLowRes1.jpg'
    },
    {
      id: '2',
      title: 'Stratamed',
      description:
        'Apósito en gel de silicona para la protección y cicatrización más rápida en heridas abiertas o recién suturadas.',
      imageUrl: 'assets/img/products/stratamed/imgi_104_MS20EX00TubeBoxLowRes.jpg'
    },
    {
      id: '3',
      title: 'Stratacel',
      description:
        'Apósito en gel diseñado para recuperar la piel tras procedimientos fraccionados y tratamientos post-laser.',
      imageUrl: 'assets/img/products/stratacel/imgi_73_SC20EX00BoxTubeHighRes-1.jpg'
    },
    {
      id: '5',
      title: 'StrataXRT',
      description:
        'Gel indicado para la prevención y el tratamiento de la dermatitis asociada a radioterapia.',
      imageUrl: 'assets/img/products/strataxrt/imgi_44_SX20EX00TubeBoxLowRes.jpg'
    }
  ];
}
