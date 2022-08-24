import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasaComponent } from './casa.component';
import { CasaRoutingModule } from './casa-routing.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProdutoModeloModule } from 'src/app/cadastro/produto-modelo/produto-modelo.module';

@NgModule({
  declarations: [CasaComponent],
  imports: [
    CommonModule,
    CasaRoutingModule,
    CarouselModule,
    ProdutoModeloModule,
  ],
  exports: [CasaRoutingModule],
})
export class CasaModule { }
