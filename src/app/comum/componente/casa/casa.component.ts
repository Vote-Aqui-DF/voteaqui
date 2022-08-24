import { Component, OnInit } from '@angular/core';

import { ProdutoModeloCrudService } from './../../../cadastro/produto-modelo/produto-modelo.service';
import { adMime } from '../../../comum/ferramenta/ferramenta-comum';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.css']
})
export class CasaComponent implements OnInit {

  public itemsPerSlide = 1;
  public singleSlideOffset = false;
  public noWrap = false;
  public cycleInterval = 3000;
  public startFromIndex = 0;
  public slides = [];

  constructor(
    private _service: ProdutoModeloCrudService,
  ) { }

  ngOnInit(): void {
    this._service.getImagemVenda().subscribe(v => {
      this.slides.length = 0;
      v.forEach(e => {
        this.slides.push(e);
      });
    });
  }

  public adMime(foto) {
    return adMime(foto);
  }

}
