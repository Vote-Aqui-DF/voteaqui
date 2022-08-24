import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Pessoa } from '../../comum/modelo/entidade/pessoa';
import { PessoaFiltroDTO } from '../../comum/modelo/dto/pessoa.filtro.dto';

@Injectable()
export class PessoaCrudService extends ServicoCrudService<Pessoa, PessoaFiltroDTO> {

  constructor() {
    super('pessoa');

    this.filtro = new PessoaFiltroDTO();
  }

}
