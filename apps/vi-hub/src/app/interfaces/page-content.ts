import { BehaviorSubject } from 'rxjs';

//use this for page content [pagination]
export interface PageContent<T> {
  items: T[];
  pageIndex$: BehaviorSubject<number>;
  total?: number;
}
