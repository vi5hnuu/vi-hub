import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViPortfolioComponent } from './vi-portfolio.component';

describe('ViPortfolioComponent', () => {
  let component: ViPortfolioComponent;
  let fixture: ComponentFixture<ViPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViPortfolioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
