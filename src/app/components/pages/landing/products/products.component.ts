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
    { id: '1', title: 'Strata-triz', description: 'Solución para el cuidado y tratamiento de la piel.', imageUrl: 'assets/img/products/strata-triz/imgi_44_ST-5-ES-Box-HighRes.jpg' },
    { id: '2', title: 'Stratamed', description: 'Producto sanitario para el cuidado de heridas y lesiones.', imageUrl: 'assets/img/products/stratamed/imgi_104_MS20EX00TubeBoxLowRes.jpg' },
    { id: '3', title: 'Stratacel', description: 'Tratamiento para la regeneración celular y cuidado dermatológico.', imageUrl: 'assets/img/products/stratacel/imgi_73_SC20EX00BoxTubeHighRes-1.jpg' },
    { id: '4', title: 'Stratamark', description: 'Solución para marcas y cicatrices en la piel.', imageUrl: 'assets/img/products/stratamark/imgi_43_SK20EX00TubeBoxLowRes1.jpg' },
    { id: '5', title: 'StrataXRT', description: 'Tratamiento avanzado para afecciones dermatológicas.', imageUrl: 'assets/img/products/strataxrt/imgi_44_SX20EX00TubeBoxLowRes.jpg' }
  ];
}
