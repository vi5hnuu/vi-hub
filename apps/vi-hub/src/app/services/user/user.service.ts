import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  EMPTY,
  interval,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { ApiRoutes } from '../../app-temp/constants/api-routes.constant';
import { ApiResponse } from '../../app-temp/interfaces/api-response';
import { ExternalUser, UserType } from '../../app-temp/interfaces/external-user';
import { AuthKeys, userInfo } from '../../app-temp/constants/auth-keys';
import { UserPermissionType } from '../../app-temp/enums/user-permission.enum';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { UtilityService } from '../utility/utility.service';
import { SnackbarType } from '../../app-temp/interfaces/snackbar.interface';

@Injectable({ providedIn: 'root' })
export class UserService implements OnDestroy {
  private SESSION_CHECK_INTERVAL = 5 * 60 * 1000; //5 mins
  private sessionCheckTimerSubs?: Subscription;
  private _userInfo?: userInfo | null;

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}

  private shouldLogout() {
    return this.http.post(ApiRoutes.user.shouldLogout(), null);
  }

  logout() {
    return fromPromise(
      new Promise((resolve, reject) => {
        this.http.post(ApiRoutes.user.logout(), null).subscribe({
          next: (res) => {
            this.resetConfig();
            resolve(res);
          },
          error: reject,
        });
      })
    );
  }

  get userInfo(): userInfo | null {
    if (this._userInfo) return this._userInfo;
    const userInfoRaw = sessionStorage.getItem(AuthKeys.USER_INFO);
    return (this._userInfo = userInfoRaw
      ? (JSON.parse(userInfoRaw) as userInfo)
      : null);
  }

  isOrg() {
    return this.userInfo?.user?.type === UserType.ORG;
  }

  hasPermission({
    any = [],
    all = [],
  }: {
    any?: UserPermissionType[];
    all?: UserPermissionType[];
  }) {
    const anyPermissionPassed = this.userInfo?.user?.permissions.some(
      (permission) => any.includes(permission)
    );
    const allPermissionPassed = !this.userInfo?.user?.permissions.find(
      (permission) => !all.includes(permission)
    );
    return anyPermissionPassed && !allPermissionPassed;
  }

  isKycAgent() {
    // console.log('userInfo permission agent',this.hasPermission({any:[UserPermissionType.KYC_AGENT,UserPermissionType.KYC_ADMIN]}))
    return this.hasPermission({
      any: [UserPermissionType.KYC_AGENT, UserPermissionType.KYC_ADMIN],
    });
  }

  initSessionCheckTimer() {
    if (this.sessionCheckTimerSubs)
      throw new Error('Session idle timer is already initiated...');
    this.sessionCheckTimerSubs = interval(this.SESSION_CHECK_INTERVAL) // in every 5 minutes
      .pipe(
        switchMap(() =>
          this.shouldLogout().pipe(
            catchError((err: HttpErrorResponse) => {
              if (err.status === 401) this.handle401();
              else console.log('Something went wrong, Error: ', err.status);
              return EMPTY;
            })
          )
        )
      )
      .subscribe({
        next: (res: any) =>
          (!res?.response?.success || !res?.session?.is_logged_in) &&
          this.redirectToSignbase(),
      });
  }

  getLoggedInUserInfo() {
    return this.http
      .get<ApiResponse<ExternalUser>>(ApiRoutes.user.userInfo())
      .pipe(
        tap((userInfo) => {
          this._userInfo = {
            sid: userInfo.session.sid,
            user: userInfo.response,
          };
          sessionStorage.setItem(
            AuthKeys.USER_INFO,
            JSON.stringify(this._userInfo)
          );
        })
      );
  }

  redirectToSignbase() {
    this.resetConfig();
    window.location.href =
      location.hostname === 'localhost'
        ? 'http://localhost:8082'
        : location.origin;
  }

  handle401(msg?: string) {
    this.utilityService
      .openDefaultSnackbar({
        data: {
          type: SnackbarType.ERROR,
          text: msg ?? 'Session expired, Logging out...',
        },
        duration: 2000,
      })
      .afterDismissed()
      .subscribe(() => this.redirectToSignbase());
  }

  private resetConfig() {
    sessionStorage.clear();
    localStorage.clear();
    delete this._userInfo;
  }

  ngOnDestroy() {
    this.sessionCheckTimerSubs?.unsubscribe();
  }
}
