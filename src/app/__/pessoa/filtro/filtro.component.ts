import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PessoaCrudService } from '../pessoa.service';
import { PessoaFormService } from '../pessoa-form.service';
import { PessoaFiltroDTO } from '../../../comum/modelo/dto/pessoa.filtro.dto';

import { deEnumParaChaveValor } from '../../../comum/ferramenta/ferramenta-comum';
import { PessoaTipo } from '../../../comum/modelo/dominio/pessoa-tipo';
import { PessoaVinculoTipo } from '../../../comum/modelo/dominio/pessoa-vinculo-tipo';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public prod = environment.production;

  public frm: FormGroup;
  public isEnviado = false;

  public marcarTodosNenhumVlr = false;

  public pessoaTipoList: any;
  public pessoaVinculoTipoList: any;

  public cliente = false;
  public fornecedor = false;
  public parceiro = false;

  constructor(
    private _service: PessoaCrudService,
    private _formService: PessoaFormService,
    private _router: Router,
  ) {
    this.pessoaTipoList = deEnumParaChaveValor(PessoaTipo);
    this.pessoaVinculoTipoList = deEnumParaChaveValor(PessoaVinculoTipo);
  }

  ngOnInit(): void {
    this.carregar(this._service.filtro);
  }

  public enviar() {
    this.isEnviado = true;
    this._service.filtro = this.frm.value;
    this._service.filtro.pessoaVinculoTipo = [];
    if (this.cliente) {
      this._service.filtro.pessoaVinculoTipo.push('CLIENTE');
    }
    if (this.fornecedor) {
      this._service.filtro.pessoaVinculoTipo.push('FORNECEDOR');
    }
    if (this.parceiro) {
      this._service.filtro.pessoaVinculoTipo.push('PARCEIRO');
    }
    this._router.navigate(['cadastro', this._service.funcionalidade]);
  }

  public carregar(f: PessoaFiltroDTO) {
    if (!f) {
      f = new PessoaFiltroDTO();
    }
    this.frm = this._formService.criarFormularioFiltro(f);
    this.cliente = false;
    this.fornecedor = false;
    this.parceiro = false;
    if (f.pessoaVinculoTipo) {
      this.cliente = f.pessoaVinculoTipo.includes('CLIENTE');
      this.fornecedor = f.pessoaVinculoTipo.includes('FORNECEDOR');
      this.parceiro = f.pessoaVinculoTipo.includes('PARCEIRO');
    }
  }

  public marcarTodosNenhum() {
    this.marcarTodosNenhumVlr = !this.marcarTodosNenhumVlr;
    this.cliente = this.marcarTodosNenhumVlr;
    this.fornecedor = this.marcarTodosNenhumVlr;
    this.parceiro = this.marcarTodosNenhumVlr;
  }

}
