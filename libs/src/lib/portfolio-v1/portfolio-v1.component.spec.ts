import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioV1Component } from './portfolio-v1.component';

describe('PortfolioV1Component', () => {
  let component: PortfolioV1Component;
  let fixture: ComponentFixture<PortfolioV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioV1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
