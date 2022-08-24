import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AnexarTipo } from './anexar-tipo';

@Component({
  selector: 'app-anexar',
  templateUrl: './anexar.component.html',
  styleUrls: ['./anexar.component.scss']
})
export class AnexarComponent implements OnInit {

  public AnexarTipo: AnexarTipo;

  public imagem: string;

  constructor(
    public dialogRef: MatDialogRef<AnexarComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      tipoAnexoList: AnexarTipo[],
      multiplo: boolean
    }
  ) { }

  ngOnInit(): void {
  }

  exibirAnexarTipo(tipo: string) {
    const tipoEnum: AnexarTipo = (<any>AnexarTipo)[tipo];
    return this.data.tipoAnexoList.lastIndexOf(tipoEnum) >= 0;
  }

  public setImagem(imagem) {
    this.imagem = imagem;
  }

  public confirmar(event) {
    let result = null;
    if (this.imagem) {
      result = { 'IMAGEM': this.imagem };
    }
    this.dialogRef.close(result);
  }

  public cancelar(event) {
    let result = null;
    this.dialogRef.close(result);
  }
}
