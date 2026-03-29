import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { FeaturesComponent } from './features/features.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { HowToBuyComponent } from './how-to-buy/how-to-buy.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    BannerComponent,
    FeaturesComponent,
    ProductsComponent,
    HowToBuyComponent,
    ContactComponent
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const hash = typeof window !== 'undefined' ? (window.location.hash || '').replace('#', '') : '';
    if (hash) {
      setTimeout(() => this.scrollToFragment(hash), 100);
    }
  }

  private scrollToFragment(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
