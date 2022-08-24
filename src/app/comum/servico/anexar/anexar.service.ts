import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AnexarTipo as AnexarTipo } from './anexar-tipo';
import { AnexarComponent } from './anexar.component';

@Injectable()
export class AnexarService {

  constructor(
    public dialog: MatDialog,
  ) {
  }

  public carregar(tipoAnexoList: AnexarTipo[], multiplo: boolean = false) {
    return new Observable((observer) => {

      const dialogRef = this.dialog.open(AnexarComponent, {
        height: '400px',
        width: '600px',
        data: {
          tipoAnexoList,
          multiplo,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          observer.next(result);
        }
        observer.complete();
      });
    });
  }

}
