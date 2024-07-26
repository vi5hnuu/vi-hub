import { HttpInterceptorFn } from '@angular/common/http';

export const SessionInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
