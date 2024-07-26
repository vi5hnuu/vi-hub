import { catchError, map, Observable, of, startWith } from 'rxjs';

export interface HttpState<T> {
  loading?: boolean;
  error?: any | null;
  data?: T | null;
}

export function withHttpState<T>() {
  return (o: Observable<T>): Observable<HttpState<T>> =>
    o.pipe(
      map((data: T) => ({ loading: false, data, error: null })),
      catchError((error) => of({ loading: false, error, data: null })),
      startWith({ loading: true, error: null, data: null })
    );
}
