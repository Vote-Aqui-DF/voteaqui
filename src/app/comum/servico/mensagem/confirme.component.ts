import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirme',
  templateUrl: './confirme.component.html',
  styleUrls: ['./confirme.component.scss']
})
export class ConfirmeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmeComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      mensagem: string,
    }
  ) { }

  ngOnInit(): void {
  }

  public confirmar(event) {
    let result = true;
    this.dialogRef.close(result);
  }

  public cancelar(event) {
    let result = false;
    this.dialogRef.close(result);
  }

}
