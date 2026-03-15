import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface FeatureCircle {
  linesTop?: string[];
  number?: string;
  linesBottom?: string[];
  /** Texto sin número (beneficio o descripción) */
  textLines?: string[];
  /** Enlace (ej. "venta online") con texto adicional debajo */
  linkText?: string;
  linkUrl?: string;
  linesAfterLink?: string[];
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {

  /** Texto del banner introductorio (fondo rosa) */
  introText = 'Stratpharma, con sede en Basilea desde 2005, es una empresa global especializada en productos sanitarios. Nuestros equipos de primer nivel diseñan, desarrollan, fabrican y comercializan soluciones innovadoras que mejoran la calidad de vida de los pacientes en todo el mundo.';

  /** Cuatro círculos de la sección principal */
  circles: FeatureCircle[] = [
    {
      linesTop: ['Presentes en', 'más de'],
      number: '30',
      linesBottom: ['hospitales en', 'España']
    },
    {
      linesTop: ['Desarrollo de', 'negocio en más de'],
      number: '35',
      linesBottom: ['países']
    },
    {
      textLines: ['Resultados más', 'rápidos: curas en la', 'mitad de tiempo']
    },
    {
      linesTop: ['Disponibles en'],
      linkText: 'venta online',
      linkUrl: '#',
      linesAfterLink: ['y en tu farmacia más', 'cercana']
    }
  ];
}
