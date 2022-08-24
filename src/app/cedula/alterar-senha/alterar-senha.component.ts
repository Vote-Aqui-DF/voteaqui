import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent implements OnInit {

  senhaAtual: string = null;
  senhaNova: string = null;

  constructor(
    public dialogRef: MatDialogRef<AlterarSenhaComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      mensagem: string,
    }
    ) { }

  ngOnInit(): void {
  }

  public confirmar(event) {
    let result = {senhaAtual: this.senhaAtual, senhaNova: this.senhaNova};
    this.dialogRef.close(result);
  }

  public cancelar(event) {
    let result = null;
    this.dialogRef.close(result);
  }
}
