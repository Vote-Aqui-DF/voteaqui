import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MensagemService } from './../comum/servico/mensagem/mensagem.service';
import { situacaoNome } from '../comum/ferramenta/ferramenta-sistema';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {

  public identificacao = null;

  public entidade = null;

  public filtro = '';
  public filtroTexto = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mensagem: MensagemService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (p) => {
      this.identificacao = p.id;
      this.route.data.subscribe(r => {
        this.entidade = r.dados;
        if (!this.entidade) {
          this.mensagem.erro(`Nenhuma votação encontrada para o identificador ${this.identificacao}`);
          this.router.navigate(['../']);
        } else {
          this.entidade.votacaoLista.forEach(e => {
            e.inicio = e.inicio.replace(/-/g, '/');
            e.termino = e.termino.replace(/-/g, '/');
          });
        }
      });
    });
  }

  situacaoNome(sigla): string {
    return situacaoNome(sigla);
  }

  filtrarVotacao(votacao: any, params): boolean {
    return (!params[1] || params[1].trim().length === 0 ||
      votacao.nome.trim().toLowerCase().indexOf(params[1].toLowerCase()) >= 0) &&
      (!params[0] || params[0].trim().length === 0 ||
        votacao.situacao === params[0]);
  }

}
