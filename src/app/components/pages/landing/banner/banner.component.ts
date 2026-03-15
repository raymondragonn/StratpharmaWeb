import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

    constructor() { }

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
            buttonLink: '#'
        }
    ];

}
