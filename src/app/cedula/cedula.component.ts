import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pauta } from './../modelo/entidade/pauta';
import { ConfirmarVotoComponent } from './confirmar-voto/confirmar-voto.component';
import { Voto } from './../modelo/entidade/voto';
import { CedulaService } from './cedula.service';
import { Opcao } from './../modelo/entidade/opcao';
import { MensagemService } from '../comum/servico/mensagem/mensagem.service';
import { situacaoNome } from '../comum/ferramenta/ferramenta-sistema';

@Component({
  selector: 'app-cedula',
  templateUrl: './cedula.component.html',
  styleUrls: ['./cedula.component.scss']
})
export class CedulaComponent implements OnInit {

  public identificacao: string;
  public entidade = null;

  public filtro = 'E';
  public filtroTexto = '';

  public etapa = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mensagem: MensagemService,
    private servico: CedulaService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (p) => {
      this.identificacao = p.id;
      this.route.data.subscribe(r => {
        this.entidade = r.dados;
        const agora = new Date();

        if (!this.entidade) {
          this.mensagem.erro(`Votação (${p.votacao}) não encontrada para o identificador ${this.identificacao}`);
          this.router.navigate(['../', this.identificacao]);
          return;
        }
        const inicio = new Date(this.entidade.votacaoLista[0].inicio.replace(/-/g, '/'));
        const termino = new Date(this.entidade.votacaoLista[0].termino.replace(/-/g, '/'));
        if (this.entidade.votacaoLista[0].situacao === 'F') {
          this.mensagem.erro(`Votação (${this.entidade.votacaoLista[0].nome}) ainda não foi iniciada. Início previsto para (${inicio})`);
          this.router.navigate(['../', this.identificacao]);
        } else if (this.entidade.votacaoLista[0].situacao === 'X') {
          this.mensagem.erro(`Votação (${this.entidade.votacaoLista[0].nome}) encerrada em (${termino})`);
          this.router.navigate(['../', this.identificacao]);
        } else if (this.entidade && this.entidade.votacaoLista[0] && this.entidade.votacaoLista[0].votou) {
          this.mensagem.erro(`O seu voto já foi registrado para esta votação!`);
          this.router.navigate(['../', this.identificacao]);
        } else if (this.entidade && this.entidade.votacaoLista[0] && this.entidade.votacaoLista[0].senhaBloqueio) {
          this.mensagem.erro(`A senha para esta votação está bloqueada!`);
          this.router.navigate(['../', this.identificacao]);
        } else {
          for (const pauta of this.entidade.votacaoLista[0].pautaLista) {
            for (const opcao of pauta.opcaoLista) {
              opcao.voto = '';
            }
          }
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

  async confirmar(): Promise<any> {
    const senha = await this.mensagem.confirmeModelo('Confirme o seu voto! Insira a senha enviada', ConfirmarVotoComponent);
    if (senha) {
      const votoJson = { codigo: this.entidade.votacaoLista[0].codigo, pautaLista: [] };

      for (const pauta of this.entidade.votacaoLista[0].pautaLista) {
        const pautaJson = { codigo: pauta.codigo, opcaoLista: [], nulo: false };
        if (pauta.nulo) {
          pautaJson.nulo = true;
        } else {
          for (const opcao of pauta.opcaoLista) {
            const opcaoJson = { codigo: opcao.codigo, valor: opcao.voto };
            if (opcao.voto && opcao.voto.trim().length) {
              pautaJson.opcaoLista.push(opcaoJson);
            }
          }
        }
        votoJson.pautaLista.push(pautaJson);
      }

      const voto = new Voto();
      voto.valor = JSON.stringify(votoJson);
      voto.votacaoId = this.entidade.votacaoLista[0].id;

      this.servico.votar(this.identificacao, this.entidade.votacaoLista[0].id, senha, voto).subscribe(r => {
        this.mensagem.sucesso('Voto registrado com sucesso!!!');
        this.router.navigate(['../', this.identificacao]);
      }, e => {
        console.log(e);
        this.mensagem.erro(e.error.msg);
      });
    }
  }

  votoSimNao(opcao: Opcao): boolean {
    return opcao['voto'] === 'S' || opcao['voto'] === 'N';
  }

  escolhas(pauta: Pauta): number {
    let qtdSim = 0;
    pauta.opcaoLista.forEach((o) => {
      qtdSim = qtdSim + (o['voto'] === 'S' ? 1 : 0);
    });
    return qtdSim;
  }

  maxPermitido(pauta: Pauta): boolean {
    return pauta.quantidadeEscolha <= this.escolhas(pauta);
  }

}
