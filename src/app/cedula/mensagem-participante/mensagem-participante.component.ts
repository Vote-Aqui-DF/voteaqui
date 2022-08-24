import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensagem-participante',
  templateUrl: './mensagem-participante.component.html',
  styleUrls: ['./mensagem-participante.component.scss']
})
export class MensagemParticipanteComponent implements OnInit {

  mensagem: string = null;

  constructor(
    public dialogRef: MatDialogRef<MensagemParticipanteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mensagem: string,
    }
  ) { }

  ngOnInit(): void {
  }

  public confirmar(event) {
    let result = this.mensagem;
    this.dialogRef.close(result);
  }

  public cancelar(event) {
    let result = null;
    this.dialogRef.close(result);
  }

}
