import {
  Injectable,
  Renderer2,
  RendererFactory2,
  ViewContainerRef,
} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { SnackbarData } from './../../interfaces/snackbar.interface';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Injectable({ providedIn: 'root' })
export class UtilityService {
  private renderer?: Renderer2;

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  openDialogModel<T>(
    component: ComponentType<T>,
    config: MatDialogConfig & { title?: string } = {}
  ) {
    return this.dialog.open(component, {
      disableClose: true,
      width: '40rem',
      ...config,
    });
  }

  openDefaultSnackbar(config: MatSnackBarConfig & { data: SnackbarData }) {
    return this.openSnackbar(SnackbarComponent, config);
  }

  openSnackbar<T>(
    component: ComponentType<T>,
    config: MatSnackBarConfig & { data: SnackbarData }
  ) {
    return this.snackbar.openFromComponent(component, {
      duration: 3000,
      announcementMessage: config.data.title,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      ...config,
      panelClass: `mat-snack-reset${
        config.panelClass ? ` ${config.panelClass}` : ''
      }`,
    });
  }

  scroll(selector: string, options?: ScrollIntoViewOptions) {
    try {
      const el = this.renderer?.selectRootElement(selector, true);
      el?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
        ...options,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
