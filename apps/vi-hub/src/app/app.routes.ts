import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'portfolio-vi',
  },
  {
    path:'portfolio-vi',
    loadChildren:()=>import('@vi-portfolio').then(portfolioV1Lib=>portfolioV1Lib.portfolioViRoutes)
  }
];
