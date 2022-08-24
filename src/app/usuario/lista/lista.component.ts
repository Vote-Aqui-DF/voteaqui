import { MensagemService } from '../../comum/servico/mensagem/mensagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../modelo/entidade/usuario';
import { UsuarioService } from '../usuario.service';
import { ConfirmarVotoComponent } from '../../cedula/confirmar-voto/confirmar-voto.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  entidade: Usuario[];

  constructor(
    private servico: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router,
    private mensagem: MensagemService,
  ) { }

  ngOnInit(): void {
    this._route.data.subscribe((info) => {
      this.entidade = info.dados;
    });
  }

  async excluir(id: number): Promise<any> {
    const senha = await this.mensagem.confirmeModelo('Digite a senha de acesso', ConfirmarVotoComponent);
    if (!senha || !senha.trim().length) {
      return;
    }
    this.servico.delete(id).subscribe(
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

}
