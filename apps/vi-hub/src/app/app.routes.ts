import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'portfolio-vi',
  },
  {
    path:'portfolio-vi',
    loadChildren:()=>import('@portfolio-v1').then(portfolioV1Lib=>portfolioV1Lib.portfolioV1Routes)
  }
];
