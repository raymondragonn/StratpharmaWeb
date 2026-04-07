import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface ProductDetailContent {
  title: string;
  paragraphList: { paragraph: string }[];
  highlightLine?: string;
  sanitaryLine?: string;
}

export interface ProductDetailData {
  mainImage: string;
  thumbnails: string[];
  shopUrl: string;
  infoUrl: string;
  content: ProductDetailContent;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  private rotationTimer: ReturnType<typeof setInterval> | null = null;
  private readonly rotationIntervalMs = 3000;

  product: ProductDetailData | null = null;
  productId: string | null = null;
  notFound = false;
  currentMainImage = '';

  /** Contenido por producto según el diseño e información adjunta */
  private readonly productsMap: Record<string, ProductDetailData> = {
    '1': {
      mainImage: 'assets/img/products/strata-triz/imgi_44_ST-5-ES-Box-HighRes.jpg',
      thumbnails: [
        'assets/img/products/strata-triz/imgi_46_ST-5-ES-Tube-HighRes.jpg',
        'assets/img/products/strata-triz/imgi_78_ST-20-ES-Box-HighRes.jpg'
      ],
      shopUrl: 'https://es.stratpharma-shop.com/product-category/strata-triz/',
      infoUrl: 'https://es.stratatriz.com',
      content: {
        title: 'STRATA-TRIZ®',
        paragraphList: [
          { paragraph: 'Strata-triz es un gel de silicona transparente, de secado rápido y no pegajoso, diseñado para el tratamiento de cicatrices anómalas o con malformaciones, incluyendo cicatrices hipertróficas, queloides y de acné.' },
          { paragraph: 'Al aplicarse según las indicaciones, Strata-triz forma una lámina de gel de silicona que actúa como una capa protectora, permeable a los gases e impermeable al agua. Esta capa contribuye a hidratar, suavizar y proteger la cicatriz. ' }
        ],
        sanitaryLine: 'STRATA-TRIZ® - Producto Sanitario Clase I'
      }
    },
    '2': {
      mainImage: 'assets/img/products/stratamed/stratamed00.jpeg',
      thumbnails: [
        'assets/img/products/stratamed/stratamed00.jpeg',
        'assets/img/products/stratamed/stratamed01.jpeg'
      ],
      shopUrl: 'https://es.stratpharma-shop.com/product-category/stratamed/',
      infoUrl: 'https://stratamed.com',
      content: {
        title: 'STRATAMED®',
        paragraphList: [
          { paragraph: 'Stratamed es un gran avance en el cuidado postoperatorio. Es un apósito flexible de contacto total que se seca por sí solo y proporciona un entorno óptimo para una cicatrización más rápida de la herida y un alivio de los síntomas (enrojecimiento/decoloración, picor, dolor, molestias).' },
          { paragraph: 'Stratamed se puede utilizar inmediatamente después de la intervención y permite prevenir la formación de cicatrices anormales antes que nunca. Es el único Producto Sanitario del Grupo IIa, formulado a base de polímeros de silicona, que ha sido registrado en la EMA y FDA con la indicación de uso en el lecho de una herida abierta.' },
          { paragraph: 'Este producto ha sido evaluado y aprobado por la FDA y la EMA.' }
        ],
        sanitaryLine: 'STRATAMED® - Producto Sanitario Clase IIa'
      }
    },
    '3': {
      mainImage: 'assets/img/products/stratacel/stratacel00.jpeg',
      thumbnails: [
        'assets/img/products/stratacel/stratacel00.jpeg'
      ],
      shopUrl: 'https://es.stratpharma-shop.com/product-category/stratacel/',
      infoUrl: 'https://stratacel.com',
      content: {
        title: 'STRATACEL®',
        paragraphList: [
          { paragraph: 'Stratacel es un apósito flexible diseñado específicamente para la reparación de piel dañada o comprometida tras procedimientos con láser (CO2, Morpheus, Dermapen), rejuvenecimiento facial, vaginal y eliminación de tatuajes.' },
          { paragraph: 'Stratacel está diseñado para aquellas zonas de la piel que son especialmente sensibles. Es adecuado para pacientes que se someten a intervenciones estéticas en la zona periorbital, los labios o las fosas nasales, o que tienen la piel sensible.' }
        ],
        highlightLine: 'Reduce el tiempo de recuperación a la mitad.',
        sanitaryLine: 'STRATACEL® - Producto Sanitario Clase IIa'
      }
    },
    '4': {
      mainImage: 'assets/img/products/stratamark/stratamark00.jpg',
      thumbnails: [
        'assets/img/products/stratamark/stratamark00.jpg',
        'assets/img/products/stratamark/stratamark01.jpg',
        'assets/img/products/stratamark/stratamark02.jpg',
        'assets/img/products/stratamark/stratamark03.png'
      ],
      shopUrl: 'https://es.stratpharma-shop.com/product-category/stratamark/',
      infoUrl: 'https://stratamark.net/',
      content: {
        title: 'STRATAMARK®',
        paragraphList: [
          { paragraph: 'Stratamark es una fórmula novedosa, especialmente diseñada para la prevención y el tratamiento de las estrías (Striae Distensae). Es un producto sanitarioregistrado con evidencia clínica probada.' },
          { paragraph: 'Stratamark se desarrolló para el tratamiento y la prevención de todo tipo de estrías, en particular aquellas que cubren una amplia superficie, como las que se producen durante el embarazo, por implantes mamarios, los estirones de la adolescencia, el aumento de peso o el culturismo.' }
        ],
        sanitaryLine: 'STRATAMARK® - Producto Sanitario Clase I'
      }
    },
    '5': {
      mainImage: 'assets/img/products/strataxrt/imgi_44_SX20EX00TubeBoxLowRes.jpg',
      thumbnails: [
        'assets/img/products/strataxrt/imgi_44_SX20EX00TubeBoxLowRes.jpg',
        'assets/img/products/strataxrt/strataxrt01.jpeg'
      ],
      shopUrl: 'https://es.stratpharma-shop.com/product-category/strataxrt/',
      infoUrl: 'https://strataxrt.com',
      content: {
        title: 'STRATAXRT®',
        paragraphList: [
          { paragraph: 'StrataXRT es un gel formulado a base de polímeros de silicona que hacen que sea semioclusivo, autosecante, bacteriostático, estéril hasta su apertura y totalmente inerte.' },
          { paragraph: 'Ha sido diseñado para su uso en todo tipo de radiodermitis, teniendo la indicación de su uso en el seno de heridas abiertas y zonas con mucosa. Registrados en la FDA, EMA y resto de agencias regulatorias mundiales.' }
        ],
        sanitaryLine: 'STRATAXRT® - Producto Sanitario Clase IIa'
      }
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = params.get('id');
        this.productId = id;
        this.loadProduct(id);
      });
  }

  ngOnDestroy(): void {
    this.stopImageRotation();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getRotationImages(): string[] {
    if (!this.product) {
      return [];
    }
    return [this.product.mainImage, ...this.product.thumbnails];
  }

  private startImageRotation(): void {
    this.stopImageRotation();
    const images = this.getRotationImages();
    if (images.length <= 1) {
      return;
    }
    const currentIndex = images.indexOf(this.currentMainImage);
    let index = currentIndex >= 0 ? currentIndex : 0;
    this.currentMainImage = images[index];
    this.rotationTimer = setInterval(() => {
      index = (index + 1) % images.length;
      this.currentMainImage = images[index];
    }, this.rotationIntervalMs);
  }

  selectImage(imageUrl: string): void {
    this.stopImageRotation();
    this.currentMainImage = imageUrl;
  }

  private stopImageRotation(): void {
    if (!this.rotationTimer) {
      return;
    }
    clearInterval(this.rotationTimer);
    this.rotationTimer = null;
  }

  private loadProduct(id: string | null): void {
    if (!id) {
      this.notFound = true;
      this.product = null;
      this.currentMainImage = '';
      this.stopImageRotation();
      return;
    }

    const data = this.productsMap[id];
    if (!data) {
      this.notFound = true;
      this.product = null;
      this.currentMainImage = '';
      this.stopImageRotation();
      return;
    }

    this.notFound = false;
    this.product = data;
    this.currentMainImage = data.mainImage;
    this.startImageRotation();
  }
}
