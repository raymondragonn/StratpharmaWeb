import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-to-buy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-to-buy.component.html',
  styleUrls: ['./how-to-buy.component.scss']
})
export class HowToBuyComponent implements AfterViewInit, OnDestroy {

  @ViewChild('explanatoryVideo') private explanatoryVideoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('modalVideo') private modalVideoRef?: ElementRef<HTMLVideoElement>;

  modalOpen = false;

  steps = [
    { number: 1, text: 'Ingresa en la sección "Nuestros productos" y selecciona el artículo que deseas.' },
    { number: 2, text: 'Haz clic en "Comprar producto"; serás redirigido a nuestra web en Suiza.' },
    { number: 3, text: 'Selecciona tu idioma en la parte superior de la página.' },
    { number: 4, text: 'Añade el producto a tu carrito de compras.' },
    { number: 5, text: 'Haz clic en el carrito, ubicado en la esquina superior derecha.' },
    { number: 6, text: 'Introduce el código de descuento: 854362' },
    { number: 7, text: 'Completa tus datos de compra.' },
    { number: 8, text: 'Haz clic en "Realizar compra" y, en pocos días, tu pedido llegará directamente a tu hogar.' }
  ];

  constructor(private router: Router) {}

  ngOnDestroy(): void {
    if (this.modalOpen) {
      document.body.style.overflow = '';
    }
  }

  ngAfterViewInit(): void {
    const el = this.explanatoryVideoRef?.nativeElement;
    if (!el) {
      return;
    }
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute('muted', '');
    const tryPlay = (): void => {
      void el.play().catch(() => {
        /* autoplay bloqueado: el usuario puede usar controles si se añaden */
      });
    };
    if (el.readyState >= 2) {
      tryPlay();
    } else {
      el.addEventListener('canplay', tryPlay, { once: true });
    }
  }

  goToProducts(event: Event): void {
    event.preventDefault();
    const scrollToProducts = (): boolean => {
      const target = document.getElementById('products');
      if (!target) {
        return false;
      }
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', '#products');
      return true;
    };

    if (scrollToProducts()) {
      return;
    }

    void this.router.navigate(['/'], { fragment: 'products' }).then(() => {
      setTimeout(() => {
        scrollToProducts();
      }, 0);
    });
  }

  openVideoModal(): void {
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
    const preview = this.explanatoryVideoRef?.nativeElement;
    preview?.pause();
    setTimeout(() => {
      const modal = this.modalVideoRef?.nativeElement;
      if (!modal) {
        return;
      }
      modal.currentTime = 0;
      modal.muted = false;
      void modal.play().catch(() => {
        modal.muted = true;
        void modal.play().catch(() => {});
      });
    }, 0);
  }

  closeVideoModal(): void {
    if (!this.modalOpen) {
      return;
    }
    const modal = this.modalVideoRef?.nativeElement;
    modal?.pause();
    if (modal) {
      modal.currentTime = 0;
    }
    this.modalOpen = false;
    document.body.style.overflow = '';
    const preview = this.explanatoryVideoRef?.nativeElement;
    if (preview) {
      void preview.play().catch(() => {});
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeCloseModal(): void {
    if (this.modalOpen) {
      this.closeVideoModal();
    }
  }
}
