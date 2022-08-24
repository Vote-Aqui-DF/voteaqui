import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmeComponent } from './confirme.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable()
export class MensagemService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  tempo = 5000;

  constructor(
    // private toastr: ToastrService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
  }

  public sucesso(msg: string, titulo: string = null): void {
    // this.toastr.success(msg, titulo ? titulo : 'Sucesso!', {
    //   positionClass: 'toast-top-center',
    //   closeButton: true,
    // });
    this._snackBar.open(msg, titulo ? titulo : 'Sucesso!', {
      duration: this.tempo,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['alert', 'alert-success'],
    });
  }

  public atencao(msg: string, titulo: string = null): void {
    // this.toastr.warning(msg, titulo ? titulo : 'Atenção!', {
    //   positionClass: 'toast-top-center',
    //   closeButton: true,
    // });
    this._snackBar.open(msg, titulo ? titulo : 'Atenção!', {
      duration: this.tempo,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['alert', 'alert-warning'],
    });
  }

  public erro(msg: string, titulo: string = null): void {
    // this.toastr.error(msg, titulo ? titulo : 'Erro!', {
    //   positionClass: 'toast-top-center',
    //   closeButton: true,
    // });
    this._snackBar.open(msg, titulo ? titulo : 'Erro!', {
      duration: this.tempo,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['alert', 'alert-danger'],
    });
  }

  public erroGrave(msg: string, titulo: string = null) {
    // this.toastr.error(msg, titulo ? titulo : 'Erro Grave!', {
    //   tapToDismiss: false,
    //   progressBar: true,
    //   progressAnimation: 'decreasing',
    //   timeOut: 10000,
    //   disableTimeOut: false,
    //   positionClass: 'toast-top-full-width',
    //   enableHtml: true,
    // });
    this._snackBar.open(msg, titulo ? titulo : 'Erro Grave!', {
      duration: this.tempo * 2,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['alert', 'alert-danger'],
    });
  }
  public confirme(mensagem: string): Promise<any> {
    return this.confirmeModelo(mensagem, ConfirmeComponent);
  }

  public confirmeModelo(mensagem: string, modelo: any): Promise<any> {
    return new Promise(async resolve => {
      const dialogRef = await this.dialog.open(modelo, {
        width: '450px',
        data: { mensagem }
      });

      dialogRef.afterClosed().subscribe(result => {
        // if (typeof result === 'string' || result === undefined) {
        //   result = false;
        // }
        resolve(result);
      });
    });
  }

}
