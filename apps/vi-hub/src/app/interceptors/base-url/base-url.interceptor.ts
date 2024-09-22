import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "@env";

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    url: req.url.startsWith('http') ? req.url : environment.apiUrl + req.url,
  });
  return next(newReq);
};
