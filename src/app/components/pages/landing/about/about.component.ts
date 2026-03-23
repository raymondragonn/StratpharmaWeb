import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface ProductDetailContent {
  title: string;
  paragraphList: { paragraph: string }[];
  highlightLine?: string;
}

export interface ProductDetailData {
  mainImage: string;
  thumbnails: string[];
  shopUrl: string;
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
      content: {
        title: 'STRATA-TRIZ',
        paragraphList: [
          { paragraph: 'Strata-triz es un gel de silicona transparente, de secado rápido y no pegajoso, formulado para el tratamiento de cicatrices tanto recientes como antiguas, así como para la prevención de cicatrices anómalas, como cicatrices hipertróficas, queloides y de acné.' },
          { paragraph: 'Cuando se utiliza según las indicaciones, Strata-triz se seca formando una lámina de gel de silicona que crea una capa protectora, permeable a los gases e impermeable al agua. Esta capa ayuda a hidratar, suavizar y proteger la cicatriz.' }
        ]
      }
    },
    '2': {
      mainImage: 'assets/img/products/stratamed/imgi_104_MS20EX00TubeBoxLowRes.jpg',
      thumbnails: [
        'assets/img/products/stratamed/imgi_107_MS05EX00TubeBoxLowRes-600x600.jpg',
        'assets/img/products/stratamed/imgi_139_MS05EX00TubeLowRes-600x600.jpg'
      ],
      shopUrl: 'https://es.stratpharma-shop.com/product-category/stratamed/',
      content: {
        title: 'STRATAMED',
        paragraphList: [
          { paragraph: 'Stratamed es un gran avance en el cuidado postoperatorio. Es un apósito flexible de contacto total que se seca por sí solo y proporciona un entorno óptimo para una cicatrización más rápida de la herida y un alivio de los síntomas (enrojecimiento/decoloración, picor, dolor, molestias).' },
          { paragraph: 'Stratamed se puede utilizar inmediatamente después de la intervención y permite prevenir la formación de cicatrices anormales antes que nunca. Es el único producto aprobado para lecho de herida abierta.' },
          { paragraph: 'Este producto ha sido evaluado y aprobado por la FDA y la EMA.' }
        ]
      }
    },
    '3': {
      mainImage: 'assets/img/products/stratacel/imgi_73_SC20EX00BoxTubeHighRes-1.jpg',
      thumbnails: [
        'assets/img/products/stratacel/imgi_46_SC10EX002BoxLowRes.jpg',
        'assets/img/products/stratacel/imgi_48_SC10EX002TubeLowRes.jpg'
      ],
      shopUrl: 'https://es.stratpharma-shop.com/product-category/stratacel/',
      content: {
        title: 'STRATACEL',
        paragraphList: [
          { paragraph: 'Stratacel es un apósito flexible diseñado específicamente para la reparación de piel dañada o comprometida tras procedimientos con láser (CO2, Morpheus, Dermapen), rejuvenecimiento facial, vaginal y eliminación de tatuajes.' },
          { paragraph: 'Stratacel está diseñado para aquellas zonas de la piel que son especialmente sensibles. Es adecuado para pacientes que se someten a intervenciones estéticas en la zona periorbital, los labios o las fosas nasales, o que tienen la piel sensible.' }
        ],
        highlightLine: 'Reduce el tiempo de recuperación a la mitad.'
      }
    },
    '4': {
      mainImage: 'assets/img/products/stratamark/imgi_43_SK20EX00TubeBoxLowRes1.jpg',
      thumbnails: [
        'assets/img/products/stratamark/imgi_45_SK20EX00TubeLowRes.jpg',
        'assets/img/products/stratamark/imgi_67_SK50EX00TubeBoxLowRes.jpg'
      ],
      shopUrl: 'https://es.stratpharma-shop.com/product-category/stratamark/',
      content: {
        title: 'STRATAMARK',
        paragraphList: [
          { paragraph: 'Stratamark es una fórmula novedosa, especialmente diseñada para la prevención y el tratamiento de las estrías (Striae Distensae). Es un dispositivo médico registrado con evidencia clínica probada.' },
          { paragraph: 'Stratamark se desarrolló para el tratamiento y la prevención de todo tipo de estrías, en particular aquellas que cubren una amplia superficie, como las que se producen durante el embarazo, por implantes mamarios, los estirones de la adolescencia, el aumento de peso o el culturismo.' }
        ]
      }
    },
    '5': {
      mainImage: 'assets/img/products/strataxrt/imgi_44_SX20EX00TubeBoxLowRes.jpg',
      thumbnails: [
        'assets/img/products/strataxrt/imgi_46_SX20EX00TubeLowRes.jpg',
        'assets/img/products/strataxrt/imgi_64_SX50EX00TubeBoxLowRes.jpg'
      ],
      shopUrl: 'https://es.stratpharma-shop.com/product-category/strataxrt/',
      content: {
        title: 'STRATAXRT',
        paragraphList: [
          { paragraph: 'StrataXRT es un gel formulado a base de polímeros de silicona que hacen que sea semioclusivo, autosecante, bacteriostático, estéril hasta su apertura y totalmente inerte.' },
          { paragraph: 'Ha sido diseñado para su uso en todo tipo de radiodermitis, teniendo la indicación de su uso en el seno de heridas abiertas y zonas con mucosa. Registrados en la FDA, EMA y resto de agencias regulatorias mundiales.' }
        ]
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
    let index = 0;
    this.currentMainImage = images[index];
    this.rotationTimer = setInterval(() => {
      index = (index + 1) % images.length;
      this.currentMainImage = images[index];
    }, this.rotationIntervalMs);
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
