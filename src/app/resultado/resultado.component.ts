import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from '../comum/servico/mensagem/mensagem.service';
import { ResultadoService } from './resultado.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {

  public entidade = null;
  public votacaoId = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mensagem: MensagemService,
    private servico: ResultadoService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (p) => {
      this.votacaoId = p.id;
      this.route.data.subscribe(r => {
        this.entidade = r.dados;

        // ordenar opcoes
        this.entidade.resultado.pautaLista.forEach((p) => {
          p.opcaoLista.sort((o1, o2) => {
            return (o1.valor.S < o2.valor.S) ? 1 :
              (o1.valor.N > o2.valor.N) ? 1 :
                (o1.nome > o2.nome) ? 1 :
                  -1;
          });
        });
      }, (e) => {
        this.mensagem.erro(e.msg);
      });
    });
  }

}
