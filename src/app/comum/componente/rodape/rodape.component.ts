import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent implements OnInit {

  ano: string;

  constructor() { }

  ngOnInit(): void {
    this.ano = `${(new Date()).getFullYear()}`;
  }

}
