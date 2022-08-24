import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { UsuarioCrudService } from '../usuario.service';
import { Usuario } from '../../../comum/modelo/entidade/usuario';
import { Confirmacao } from 'src/app/comum/modelo/dominio/confirmacao';
import { UsuarioPerfil } from 'src/app/comum/modelo/dominio/usuario-perfil';
import { deEnumParaChaveValor, adMime } from '../../../comum/ferramenta/ferramenta-comum';
import { constante } from './../../../comum/constante';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public prod = environment.production;

  public headElements = [
    'foto',
    'login',
    'perfil',
    'email',
    'pessoa',
    'ativo',
    'acao',
  ];

  public dataSource: MatTableDataSource<Usuario>;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  public confirmacaoList: any;

  constructor(
    private _service: UsuarioCrudService,
    private _activatedRoute: ActivatedRoute,
    private _mensagem: MensagemService,
  ) {
    this.confirmacaoList = deEnumParaChaveValor(Confirmacao);
  }

  ngOnInit() {
    this._activatedRoute.data.subscribe((info) => {
      info.resolve.principal.subscribe((p: Usuario[]) => {
        this._service.lista.length = 0;
        p.forEach((r: Usuario) => {
          r.foto = adMime(r.foto);
          this._service.lista.push(r);
        });
        this.dataSource = new MatTableDataSource(this._service.lista);
      });
    });
  }

  public adMime(v) {
    return adMime(v);
  }

  public aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public exibeAtivo(v: Confirmacao) {
    if (!v) {
      return '';
    }
    const result = this.confirmacaoList.filter((i: { chave: string, valor: string }) => i.chave === v);
    return result ? result[0].valor : '';
  }

  public exibePerfil(v: Usuario) {
    return v.perfil;
  }

  public async reiniciarSenha(usuarioId: number) {
    if (await this._mensagem.confirme('Confirma o reinicio da senha?')) {
      this._service.reiniciarSenha(usuarioId).subscribe(r => {
        this._mensagem.sucesso('E-mail de recuperação de senha enviado!');
      });
    }
  }

}
