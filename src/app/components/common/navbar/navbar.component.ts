import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  location: string = '';
  private routerSubscription: any;

  navItems = [
    { id: 'home', title: 'HOME' },
    { id: 'about', title: 'SOBRE NOSOTROS' },
    { id: 'products', title: 'NUESTROS PRODUCTOS', titleLines: ['NUESTROS', 'PRODUCTOS'] },
    { id: 'contact', title: 'CONTACTO' }
  ];

  currentSection = 'home';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.recallJsFuntions();
    this.updateCurrentSectionFromRoute(this.router.url);
    const hash = (typeof window !== 'undefined' && window.location.hash || '').replace('#', '');
    if (hash && this.navItems.some(item => item.id === hash)) {
      this.currentSection = hash;
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  recallJsFuntions(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe(event => {
        this.location = this.router.url;
        if (event instanceof NavigationEnd) {
          this.updateCurrentSectionFromRoute(event.urlAfterRedirects || event.url);
        }
      });
  }

  private updateCurrentSectionFromRoute(url: string): void {
    const path = url.split('?')[0].split('#')[0];
    const hash = url.includes('#') ? url.split('#')[1]?.split('?')[0] || '' : '';
    if (path.startsWith('/product')) {
      this.currentSection = 'products';
    } else if (path === '/' || path === '') {
      this.currentSection = hash && this.navItems.some(item => item.id === hash) ? hash : 'home';
    }
  }

  isActive(sectionId: string): boolean {
    return this.currentSection === sectionId;
  }

  /** Navega a la landing con ancla; el scroll lo aplica App tras NavigationEnd (evita scrollTo(0,0) global). */
  private goToLandingSection(id: string): void {
    this.closeNavbar();
    void this.router.navigate(['/'], { fragment: id }).then(() => {
      this.currentSection = id;
    });
  }

  onLogoClick(event: Event): void {
    event.preventDefault();
    this.goToLandingSection('home');
  }

  onNavClick(event: Event, id: string): void {
    event.preventDefault();
    this.goToLandingSection(id);
  }

  private closeNavbar(): void {
    const collapseEl = document.getElementById('navbarSupportedContent');
    if (collapseEl?.classList.contains('show')) {
      const bootstrap = (window as unknown as { bootstrap?: { Collapse: { getInstance: (el: Element) => { hide: () => void } | null } } }).bootstrap;
      bootstrap?.Collapse?.getInstance(collapseEl)?.hide();
    }
  }
}
