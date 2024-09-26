import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSidebarComponent } from './components/info-sidebar/info-sidebar.component';
import { GitRepoService } from './services/git-repo/git-repo.service';

@Component({
  selector: 'lib-vi-portfolio',
  standalone: true,
  imports: [CommonModule, InfoSidebarComponent],
  providers:[GitRepoService],
  templateUrl: './vi-portfolio.component.html',
  styleUrl: './vi-portfolio.component.scss',
})
export class ViPortfolioComponent {
  constructor(public gitRepoService:GitRepoService) {
    gitRepoService.initGitRepos().then(console.log);
  }
}
