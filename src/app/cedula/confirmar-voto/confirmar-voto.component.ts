import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-voto',
  templateUrl: './confirmar-voto.component.html',
  styleUrls: ['./confirmar-voto.component.scss']
})
export class ConfirmarVotoComponent implements OnInit {

  senha: string = null;

  constructor(
    public dialogRef: MatDialogRef<ConfirmarVotoComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      mensagem: string,
    }
    ) { }

  ngOnInit(): void {
  }

  public confirmar(event) {
    let result = this.senha;
    this.dialogRef.close(result);
  }

  public cancelar(event) {
    let result = null;
    this.dialogRef.close(result);
  }
}
