import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSidebarComponent } from './components/info-sidebar/info-sidebar.component';

@Component({
  selector: 'lib-vi-portfolio',
  standalone: true,
  imports: [CommonModule, InfoSidebarComponent],
  templateUrl: './vi-portfolio.component.html',
  styleUrl: './vi-portfolio.component.scss',
})
export class ViPortfolioComponent {}
