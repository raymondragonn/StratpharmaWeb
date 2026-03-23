import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    navItems = [
        'Especialización médica',
        'Innovación tecnológica',
        'Confianza y respaldo profesional'
    ];

    bannerContent = [
        {
            subTitle: 'DESDE EL PRIMER DÍA',
            title: 'CIENCIA QUE CURA TU PIEL',
            buttonText: 'VER PRODUCTOS',
            buttonLink: '/',
            buttonFragment: 'products'
        }
    ];

    onProductsClick(event: MouseEvent): void {
        event.preventDefault();
        const targetFragment = this.bannerContent[0].buttonFragment;

        if (this.router.url.split('#')[0] !== '/') {
            this.router.navigate(['/'], { fragment: targetFragment }).then(() => {
                this.scrollToFragment(targetFragment);
            });
            return;
        }

        this.scrollToFragment(targetFragment);
    }

    private scrollToFragment(fragmentId: string): void {
        requestAnimationFrame(() => {
            const target = document.getElementById(fragmentId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

}
