import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioCrudService } from '../usuario.service';
import { UsuarioFormService } from '../usuario-form.service';
import { UsuarioFiltroDTO } from '../../../comum/modelo/dto/usuario.filtro.dto';

import { deEnumParaChaveValor } from '../../../comum/ferramenta/ferramenta-comum';
import { Confirmacao } from 'src/app/comum/modelo/dominio/confirmacao';
import { UsuarioPerfil } from '../../../comum/modelo/dominio/usuario-perfil';

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

  public confirmacaoList: any;
  public usuarioPerfilList: any;

  public admin = false;
  public cliente = false;
  public parceiro = false;

  constructor(
    private _service: UsuarioCrudService,
    private _formService: UsuarioFormService,
    private _router: Router,
  ) {
    this.confirmacaoList = deEnumParaChaveValor(Confirmacao);
    this.usuarioPerfilList = deEnumParaChaveValor(UsuarioPerfil);
  }

  ngOnInit(): void {
    this.carregar(this._service.filtro);
  }

  public enviar() {
    this.isEnviado = true;
    this._service.filtro = this.frm.value;
    this._service.filtro.perfil = [];
    if (this.admin) {
      this._service.filtro.perfil.push('Admin');
    }
    if (this.cliente) {
      this._service.filtro.perfil.push('Cliente');
    }
    if (this.parceiro) {
      this._service.filtro.perfil.push('Parceiro');
    }
    this._router.navigate(['cadastro', this._service.funcionalidade]);
  }

  public carregar(f: UsuarioFiltroDTO) {
    if (!f) {
      f = new UsuarioFiltroDTO();
    }
    this.frm = this._formService.criarFormularioFiltro(f);
    this.admin = false;
    this.cliente = false;
    this.parceiro = false;
    if (f.perfil) {
      this.admin = f.perfil.includes('Admin');
      this.cliente = f.perfil.includes('Cliente');
      this.parceiro = f.perfil.includes('Parceiro');
    }
  }

  public marcarTodosNenhum() {
    this.marcarTodosNenhumVlr = !this.marcarTodosNenhumVlr;
    this.admin = this.marcarTodosNenhumVlr;
    this.cliente = this.marcarTodosNenhumVlr;
    this.parceiro = this.marcarTodosNenhumVlr;
  }

  public exibeConfirmacao(v: Confirmacao) {
    if (!v) {
      return '';
    }
    const result = this.confirmacaoList.filter((i: { chave: string, valor: string }) => i.chave === v);
    return result ? result[0].valor : '';
  }

}
