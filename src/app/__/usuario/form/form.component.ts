import { constante } from './../../../comum/constante';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioCrudService } from '../usuario.service';
import { UsuarioFormService } from '../usuario-form.service';
import { PessoaCrudService } from '../../pessoa/pessoa.service';
import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { Usuario } from '../../../comum/modelo/entidade/usuario';
import { UsuarioPerfil } from '../../../comum/modelo/dominio/usuario-perfil';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { removeMime, adMime, deEnumParaChaveValor, sugereLogin } from '../../../comum/ferramenta/ferramenta-comum';
import { pessoaListComparar } from '../../../comum/ferramenta/ferramenta-sistema';
import { Confirmacao } from 'src/app/comum/modelo/dominio/confirmacao';
import { AnexarService } from 'src/app/comum/servico/anexar/anexar.service';
import { AnexarTipo } from 'src/app/comum/servico/anexar/anexar-tipo';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public prod = environment.production;

  public frm: FormGroup = this._formService.criarFormulario(new Usuario());

  public isEnviado = false;
  public id: number;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  public confirmacaoList: any;
  public usuarioPerfilList: any;

  constructor(
    private _service: UsuarioCrudService,
    private _formService: UsuarioFormService,
    private _pessoaService: PessoaCrudService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
    private _anexar: AnexarService,
  ) {
    this.confirmacaoList = deEnumParaChaveValor(Confirmacao);
    this.usuarioPerfilList = deEnumParaChaveValor(UsuarioPerfil);
  }

  ngOnInit() {
    this._route.params.subscribe(p => {
      this.id = p.id;
    });

    this._route.data.subscribe((info) => {
      info.resolve.principal.subscribe((p: Usuario) => {
        this._service.entidade = p;
        this.carregar(this._service.entidade);
      });
    });
  }

  public get administrador() {
    return this.frm.value.perfil && this.frm.value.perfil.includes('Admin');
  }

  public set administrador(valor) {
    const p = this.frm.value.perfil.split(',');
    if (valor) {
      p.push('Admin');
    } else {
      p.splice(p.indexOf('Admin'), 1);
    }
    this.frm.controls.perfil.setValue(p.filter(v => v).sort().join(','));
    this.frm.controls.perfil.markAllAsTouched();
    this.frm.controls.perfil.markAsDirty();
  }

  public get cliente() {
    return this.frm.value.perfil && this.frm.value.perfil.includes('Cliente');
  }

  public set cliente(valor) {
    const p = this.frm.value.perfil.split(',');
    if (valor) {
      p.push('Cliente');
    } else {
      p.splice(p.indexOf('Cliente'), 1);
    }
    this.frm.controls.perfil.setValue(p.filter(v => v).sort().join(','));
    this.frm.controls.perfil.markAllAsTouched();
    this.frm.controls.perfil.markAsDirty();
  }

  public get parceiro() {
    return this.frm.value.perfil && this.frm.value.perfil.includes('Parceiro');
  }

  public set parceiro(valor) {
    const p = this.frm.value.perfil.split(',');
    if (valor) {
      p.push('Parceiro');
    } else {
      p.splice(p.indexOf('Parceiro'), 1);
    }
    this.frm.controls.perfil.setValue(p.filter(v => v).sort().join(','));
    this.frm.controls.perfil.markAllAsTouched();
    this.frm.controls.perfil.markAsDirty();
  }

  public get acao() {
    return this._service.acao;
  }

  public enviar(event) {
    event.preventDefault();
    this.isEnviado = true;

    if (this.frm.invalid) {
      const msg = 'Dados inválidos!';
      console.error(this.frm);
      this._mensagem.erro(msg);
      throw new Error(msg);
    }

    const entidade = this.frm.value;
    entidade.foto = removeMime(entidade.foto);

    if ('Novo' === this._service.acao) {
      this._service.create(entidade).subscribe((id: number) => {
        this._mensagem.sucesso('Novo registro efetuado!\n\nVisualizando...');
        this._router.navigate(['cadastro', this._service.funcionalidade, id]);
      });
    } else {
      this._service.update(this.id, entidade).subscribe(() => {
        this._mensagem.sucesso('Registro atualizado!');
        this._router.navigate(['cadastro', this._service.funcionalidade]);
      });
    }
  }

  public carregar(f: Usuario) {
    if (!f) {
      f = new Usuario();
    }
    this.frm = this._formService.criarFormulario(f);
  }

  public async restaurar() {
    if (await
      this._mensagem.confirme(
        `
        <p>
           Confirma a restauração dos dados do formulário?
        </p>
        <div class="alert alert-danger" role="alert">
           Todas as modificações serão perdidas!
        </div>
         `)) {
      this.carregar(this._service.entidade);
    }
  }

  public displayFnPessoa(pessoa?: Pessoa): string {
    return pessoa ? `${pessoa.nome} (${pessoa.cpfCnpj})` : '';
  }

  public $filteredOptionsPessoa = new Promise((resolve, reject) => {
    let result = [];
    resolve(result);
    return result;
  });

  public completarPessoa(event: KeyboardEvent) {
    if (
      !(
        (event.key === 'ArrowUp') ||
        (event.key === 'ArrowDown') ||
        (event.key === 'ArrowRight') ||
        (event.key === 'ArrowLeft'))
    ) {
      this.$filteredOptionsPessoa = new Promise((resolve, reject) => {
        const result = [];
        if (typeof this.frm.value.pessoa === 'string' && this.frm.value.pessoa.length) {
          this._pessoaService.filtro.nome = this.frm.value.pessoa;
          this._pessoaService.filtro.cpfCnpj = this.frm.value.pessoa;
          this._pessoaService.filtrar().subscribe(lista => {
            lista.forEach(val => {
              result.push(Object.assign({}, val));
            });
            resolve(result);
            return result;
          });
        }
      });
    }
  }

  public excluirPessoa(idx) {
    this.frm.controls.pessoa.setValue({});
  }

  public pessoaListComparar(o1: Pessoa, o2: Pessoa) {
    return pessoaListComparar(o1, o2);
  }

  public carregarFoto(event) {
    event.preventDefault();
    this._anexar.carregar([AnexarTipo.IMAGEM], false).subscribe((v) => {
      const foto = v['IMAGEM'][0];
      this.frm.get('foto').setValue(foto);
    });
  }

  public limparFoto(event) {
    event.preventDefault();
    this.frm.get('foto').setValue(null);
  }

  public adMime(v) {
    return adMime(v);
  }

  public async loginDisponivel(event, login, id) {
    event.preventDefault();
    const disponivel = await this._service.loginDisponivel(login, id).toPromise();
    if (disponivel) {
      this._mensagem.sucesso('Login disponível');
    } else {
      this._mensagem.erro('Login indisponível');
    }
  }

  public async pessoaDisponivel(event, pessoaId, id) {
    event.preventDefault();
    const disponivel = await this._service.pessoaDisponivel(pessoaId, id).toPromise();
    if (disponivel) {
      this._mensagem.sucesso('Pessoa disponível');
    } else {
      this._mensagem.erro('Pessoa indisponível');
    }
  }

  public async emailDisponivel(event, email, id) {
    event.preventDefault();
    const disponivel = await this._service.emailDisponivel(email, id).toPromise();
    if (disponivel) {
      this._mensagem.sucesso('E-mail disponível');
    } else {
      this._mensagem.erro('E-mail indisponível');
    }
  }

  public sugereLogin(usuario: Usuario) {
    if (usuario.pessoa && usuario.pessoa.id) {
      if (usuario.pessoa.nome && (!usuario.login || usuario.login.trim().length === 0)) {
        const login = sugereLogin(usuario.pessoa.nome);
        this.frm.controls.login.setValue(login);
      }
      if (usuario.pessoa.email && (!usuario.email || usuario.email.trim().length === 0)) {
        this.frm.controls.email.setValue(usuario.pessoa.email);
      }
    }
  }

}
