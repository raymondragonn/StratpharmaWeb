import { Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { AboutComponent } from './components/pages/landing/about/about.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'product/:id', component: AboutComponent }
];
