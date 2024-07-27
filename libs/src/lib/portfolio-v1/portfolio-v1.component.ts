import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InfoSidebarComponent} from "./components/info-sidebar/info-sidebar.component";

@Component({
  selector: 'vi-portfolio-v1',
  standalone: true,
  imports: [CommonModule, InfoSidebarComponent],
  templateUrl: './portfolio-v1.component.html',
  styleUrl: './portfolio-v1.component.scss',
})
export class PortfolioV1Component {}
