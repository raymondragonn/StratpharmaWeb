import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
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

  /** True si estamos en la landing (path es /) */
  isOnLanding(): boolean {
    const path = this.router.url.split('?')[0].split('#')[0];
    return path === '/' || path === '';
  }

  private updateCurrentSectionFromRoute(url: string): void {
    const path = url.split('?')[0].split('#')[0];
    const hash = url.includes('#') ? url.split('#')[1]?.split('?')[0] || '' : '';
    if (path.startsWith('/producto')) {
      this.currentSection = 'products';
    } else if (path === '/' || path === '') {
      this.currentSection = hash && this.navItems.some(item => item.id === hash) ? hash : 'home';
    }
  }

  isActive(sectionId: string): boolean {
    return this.currentSection === sectionId;
  }

  scrollToSection(id: string): void {
    this.closeNavbar();
    if (this.isOnLanding()) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${id}`);
        this.currentSection = id;
      }
    } else {
      this.router.navigate(['/'], { fragment: id }).then(() => {
        this.currentSection = id;
      });
    }
  }

  onLogoClick(event: Event): void {
    if (this.isOnLanding()) {
      event.preventDefault();
      this.scrollToSection('home');
    }
  }

  /** En landing: evita el navego por defecto y hace scroll. En otras rutas: deja que routerLink navegue. */
  onNavClick(event: Event, id: string): void {
    if (this.isOnLanding()) {
      event.preventDefault();
      this.scrollToSection(id);
    }
  }

  private closeNavbar(): void {
    const collapseEl = document.getElementById('navbarSupportedContent');
    if (collapseEl?.classList.contains('show')) {
      const bootstrap = (window as unknown as { bootstrap?: { Collapse: { getInstance: (el: Element) => { hide: () => void } | null } } }).bootstrap;
      bootstrap?.Collapse?.getInstance(collapseEl)?.hide();
    }
  }
}
