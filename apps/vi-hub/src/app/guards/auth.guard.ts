import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): MaybeAsync<GuardResult> => {
  try {
    return true;
  } catch (e: any) {
    return false;
  }
};
