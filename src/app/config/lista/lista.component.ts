import { ConfirmarVotoComponent } from './../../cedula/confirmar-voto/confirmar-voto.component';
import { MensagemService } from './../../comum/servico/mensagem/mensagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Votacao } from './../../modelo/entidade/votacao';
import { ConfigService } from './../config.service';
import { situacaoNome } from '../../comum/ferramenta/ferramenta-sistema';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  entidade: Votacao[];

  constructor(
    private servico: ConfigService,
    private _route: ActivatedRoute,
    private _router: Router,
    private mensagem: MensagemService,
  ) { }

  ngOnInit(): void {
    this._route.data.subscribe((info) => {
      this.entidade = info.dados;
      for (let i = this.entidade.length -1; i >=0 ; i--) {
        if (this.entidade[i].codigo === 'ascap20202024') {
          this.entidade.splice(i, 1);
        }
      }
    });
  }

  async excluir(id: number): Promise<any> {
    const senha = await this.mensagem.confirmeModelo('Digite a senha de acesso', ConfirmarVotoComponent);
    if (!senha || !senha.trim().length) {
      return;
    }
    this.servico.delete(id, senha).subscribe(
      (r) => {
        this.mensagem.sucesso('Registro excluído!');
        window.location.reload();
      },
      (e) => {
        this.mensagem.erro('Erro ao excluir o registro!');
        console.log(e);
        setTimeout(() => window.location.reload(), 3 * 1000);
      }
    );
  }

  situacaoNome(sigla): string {
    return situacaoNome(sigla);
  }

}
