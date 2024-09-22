import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef,} from '@angular/material/snack-bar';
import {widthFillAnimation} from '../../utils/animations';
import {MatButton} from '@angular/material/button';
import {SnackbarData, SnackbarType, snackInfo} from "../../interfaces/snackbar.interface";

@Component({
  selector: 'vi-snackbar',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css',
  animations: [widthFillAnimation],
})
export class SnackbarComponent implements OnInit, OnDestroy {
  barWidth = 0;
  private timer?: any;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
    public snackRef: MatSnackBarRef<SnackbarComponent>
  ) {
  }

  ngOnInit() {
    this.barWidth = this.snackRef.containerInstance.snackBarConfig.duration ? 0 : 100;
    let duration = this.snackRef.containerInstance.snackBarConfig.duration ?? 0;
    this.timer = setInterval(() => {
      duration -= 100;
      if (duration < 0) return clearInterval(this.timer);
      this.barWidth =
        100 -
        (duration * 100) /
        (this.snackRef.containerInstance.snackBarConfig.duration ?? 0);
    }, 100);
  }

  closeSnackbar(actionClicked?: boolean) {
    actionClicked ? this.snackRef.dismissWithAction() : this.snackRef.dismiss();
  }

  get typeClass(): snackInfo {
    switch (this.data.type) {
      case SnackbarType.ERROR:
        return {
          icon: 'snack/error.svg',
          bar: 'bg-error-50',
          action: 'bg-error-90 text-error-40 hover:bg-error-40/10',
          content: '!text-error-22',
          ...this.data.info,
        };
      case SnackbarType.INFO:
        return {
          icon: 'snack/info.svg',
          bar: 'bg-primary-40',
          action: 'bg-primary-90 text-primary-98',
          content: '!text-primary-22',
          ...this.data.info,
        };
      case SnackbarType.WARN:
        return {
          icon: 'snack/warning.svg',
          bar: 'bg-warning-85',
          action: 'bg-error-90 text-warning-95',
          content: '!text-warning-30',
          ...this.data.info,
        };
      case SnackbarType.SUCCESS:
        return {
          icon: 'snack/success.svg',
          bar: 'bg-success-65',
          action: 'bg-success-98 text-success-50',
          content: '!text-success-30',
          ...this.data.info,
        };
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
