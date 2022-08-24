import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { PessoaCrudService } from '../pessoa.service';
import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { deEnumParaChaveValor } from '../../../comum/ferramenta/ferramenta-comum';
import { ParceiroFuncao } from '../../../comum/modelo/dominio/parceiro-funcao';
import { PessoaTipo } from '../../../comum/modelo/dominio/pessoa-tipo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public prod = environment.production;

  public headElements = [
    'nome',
    'vinculo',
    'pessoaTipo',
    'cpfCnpj',
    'email',
  ];

  public dataSource: MatTableDataSource<Pessoa>;

  public parceiroFuncaoList: any;
  public pessoaTipoList: any;

  constructor(
    private _service: PessoaCrudService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.parceiroFuncaoList = deEnumParaChaveValor(ParceiroFuncao);
    this.pessoaTipoList = deEnumParaChaveValor(PessoaTipo);
  }

  ngOnInit() {
    this._activatedRoute.data.subscribe((info) => {
      info.resolve.principal.subscribe((p: Pessoa[]) => {
        this._service.lista.length = 0;
        p.forEach((r: Pessoa) => this._service.lista.push(r));
        this.dataSource = new MatTableDataSource(this._service.lista);
      });
    });
  }

  public aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public exibeVinculo(reg: Pessoa) {
    const vinc =
      (reg.parceiro && reg.parceiro.id ? 'Parceiro (' + (reg.parceiro.funcao ? this.exibeParceiroFuncao(reg.parceiro.funcao) : 'Não informado') + ') ' : '') +
      (reg.fornecedor && reg.fornecedor.id ? 'Fornecedor ' : '') +
      (reg.cliente && reg.cliente.id ? 'Cliente ' : '');
    return vinc ? vinc : 'Sem vínculo';
  }

  public exibeParceiroFuncao(v: ParceiroFuncao) {
    if (!v) {
      return '';
    }
    const result = this.parceiroFuncaoList.filter((i: { chave: string, valor: string }) => i.chave === v);
    return result ? result[0].valor : '';
  }

  public exibePessoaTipo(v: PessoaTipo) {
    if (!v) {
      return '';
    }
    const result = this.pessoaTipoList.filter((i: { chave: string, valor: string }) => i.chave === v);
    return result ? result[0].valor : '';
  }

}
