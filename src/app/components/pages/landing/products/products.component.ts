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
      title: 'Strata-triz®',
      description:
        'Gel de silicona para el tratamiento de cicatrices nuevas y antiguas.',
      imageUrl: 'assets/img/products/strata-triz/strata-triz-portada.png'
    },
    {
      id: '4',
      title: 'Stratamark®',
      description: 'Gel de silicona formulado para la prevención y el tratamiento de las estrías.',
      imageUrl: 'assets/img/products/stratamark/stratamark-portada.png'
    },
    {
      id: '2',
      title: 'Stratamed®',
      description:
        'Apósito en gel de silicona para la protección y cicatrización más rápida en heridas abiertas o recién suturadas.',
      imageUrl: 'assets/img/products/stratamed/stratamed-portada.png'
    },
    {
      id: '3',
      title: 'Stratacel®',
      description:
        'Apósito en gel diseñado para recuperar la piel tras procedimientos fraccionados y tratamientos post-laser.',
      imageUrl: 'assets/img/products/stratacel/stratacel-portada.png'
    },
    {
      id: '5',
      title: 'StrataXRT®',
      description:
        'Gel indicado para la prevención y el tratamiento de la dermatitis asociada a radioterapia.',
      imageUrl: 'assets/img/products/strataxrt/strataxrt-portada.png'
    }
  ];
}
