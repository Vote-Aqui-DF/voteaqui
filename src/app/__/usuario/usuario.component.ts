import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MensagemService } from '../../comum/servico/mensagem/mensagem.service';
import { UsuarioCrudService } from './usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  public formulario = {
    nome: 'Cadastro de Usuários',
  };

  constructor(
    private _service: UsuarioCrudService,
    private _mensagem: MensagemService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  public async excluir(event) {
    event.preventDefault();
    if (await this._mensagem.confirme('ATENÇÃO! Esta operação não poderá ser desfeita!\n\nConfirma a exclusão?')) {
      this._service.delete(this._service.entidade.id).subscribe(() => {
        this._mensagem.sucesso('Registro excluído!');
        this._router.navigate(['cadastro', this._service.funcionalidade]);
      });
    }
  }

  public get acao() {
    return this._service.acao;
  }

}
