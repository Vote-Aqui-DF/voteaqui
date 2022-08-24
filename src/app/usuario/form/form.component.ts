import { PessoaService } from './../../pessoa/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from '../usuario.service';
import { constante } from '../../comum/constante';
import { Pessoa } from '../../modelo/entidade/pessoa';
import { Usuario } from '../../modelo/entidade/usuario';
import { MensagemService } from '../../comum/servico/mensagem/mensagem.service';
import { AnexarService } from '../../comum/servico/anexar/anexar.service';
import { AnexarTipo } from '../../comum/servico/anexar/anexar-tipo';
import { removeMime, adMime, deEnumParaChaveValor, sugereLogin } from '../../comum/ferramenta/ferramenta-comum';
import { pessoaListComparar } from '../../comum/ferramenta/ferramenta-sistema';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public id: number;
  public entidade: Usuario = null;
  public frm: FormGroup = this.carregar(new Usuario());

  public filtro = '';
  public filtroTexto = '';
  public selecionaTodos = false;

  public isEnviado = false;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  public confirmacaoList: any;
  public usuarioPerfilList: any;

  public $filteredOptionsPessoa = new Promise((resolve, reject) => {
    const result = [];
    resolve(result);
    return result;
  });

  constructor(
    private fb: FormBuilder,
    private servico: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router,
    private mensagem: MensagemService,
    private _anexar: AnexarService,
    private _pessoaService: PessoaService,
  ) { }

  agora(): Date {
    return new Date();
  }

  ngOnInit(): void {
    this._route.params.subscribe(p => {
      this.id = p.id;
      this._route.data.subscribe((info) => {
        info.dados.subscribe((d) => {
          this.entidade = d;
          this.frm = this.carregar(this.entidade);
        }, (e) => {
          this.mensagem.erro('Acesso não autorizado');
          this._router.navigate(['/config']);
        });
      });
    });
  }

  private carregar(usuario: Usuario): FormGroup {
    return this.criarFormulario(usuario);
  }

  getLista(frm: FormGroup, lista: string): FormArray {
    return frm.get(lista) as FormArray;
  }

  private criarFormulario(usuario: Usuario): FormGroup {
    const result = this.fb.group({
      id: [usuario.id, []],
      login: [usuario.login, [Validators.required]],
      foto: [usuario.foto, []],
      email: [usuario.email, [Validators.required]],
      perfil: [usuario.perfil, [Validators.required]],
      ativo: [usuario.ativo, [Validators.required]],
    });
    return result;
  }

  async enviar(event): Promise<any> {
    event.preventDefault();
    if (this.frm.invalid) {
      const msg = 'Dados inválidos. Corrija-os antes de enviar.';
      this.mensagem.erro(msg);
      throw new Error(msg);
    }
    if (!this.frm.value.id) {
      this.servico.create(this.frm.value as Usuario).subscribe((r) => {
        this.mensagem.sucesso('Sucesso. As informações foram salvas!');
        this._router.navigate(['/config']);
      }, (err) => {
        console.log(err);
        this.mensagem.erro(`Erro ao processar. (${err})`);
      });
    } else {
      this.servico.update(this.frm.value as Usuario).subscribe((r) => {
        this.mensagem.sucesso('Sucesso. As informações foram salvas!');
        this._router.navigate(['/config']);
      }, (err) => {
        console.log(err);
        this.mensagem.erro(`Erro ao processar.`);
      });
    }
  }

  filtrar(participante: any, params): boolean {
    return (!params[0] || params[0].trim().length === 0 ||
      (params[0] === 'V' && participante.value.votou) ||
      (params[0] === 'N' && !participante.value.votou)) &&
      (!params[1] || params[1].trim().length === 0 ||
        participante.value.nome.trim().toLowerCase().indexOf(params[1].toLowerCase()) >= 0 ||
        participante.value.identificacao.trim().toLowerCase().indexOf(params[1].toLowerCase()) >= 0
      );
  }

  seleciona(event): void {
    this.frm.value.participanteLista.forEach(p => p.selecao = !this.selecionaTodos);
  }

  totalSelecao(): number {
    let total = 0;
    this.frm.value.participanteLista.forEach(p => total = total + (p.selecao ? 1 : 0));
    return total;
  }

  formataTelefone(): void {
    this.frm.value.participanteLista.forEach(p => p.telefone = this.formataTelefone1(p.telefone));
  }

  formataTelefone1(numero: string): string {
    if (numero && numero.trim() && numero.trim().length < 13) {
      numero = numero.replace(/[^0-9]/gi, '');
      if (numero.length <= 9) {
        numero = '5561' + numero;
      } else {
        numero = '55' + numero;
      }
    }
    return numero;
  }
  public get administrador(): boolean {
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

  public get cliente(): boolean {
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

  public get parceiro(): boolean {
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

  public displayFnPessoa(pessoa?: Pessoa): string {
    return pessoa ? `${pessoa.nome} (${pessoa.cpfCnpj})` : '';
  }

  public completarPessoa(event: KeyboardEvent): void {
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

  public excluirPessoa(idx): void {
    this.frm.controls.pessoa.setValue({});
  }

  public pessoaListComparar(o1: Pessoa, o2: Pessoa): boolean {
    return pessoaListComparar(o1, o2);
  }

  public carregarFoto(event): void {
    event.preventDefault();
    this._anexar.carregar([AnexarTipo.IMAGEM], false).subscribe((v) => {
      const foto = v['IMAGEM'][0];
      this.frm.get('foto').setValue(foto);
    });
  }

  public limparFoto(event): void {
    event.preventDefault();
    this.frm.get('foto').setValue(null);
  }

  public adMime(v): string {
    return adMime(v);
  }

  public async loginDisponivel(event, login, id): Promise<any> {
    event.preventDefault();
    const disponivel = await this.servico.loginDisponivel(login, id).toPromise();
    if (disponivel) {
      this.mensagem.sucesso('Login disponível');
    } else {
      this.mensagem.erro('Login indisponível');
    }
  }

  public async pessoaDisponivel(event, pessoaId, id): Promise<any> {
    event.preventDefault();
    const disponivel = await this.servico.pessoaDisponivel(pessoaId, id).toPromise();
    if (disponivel) {
      this.mensagem.sucesso('Pessoa disponível');
    } else {
      this.mensagem.erro('Pessoa indisponível');
    }
  }

  public async emailDisponivel(event, email, id): Promise<any> {
    event.preventDefault();
    const disponivel = await this.servico.emailDisponivel(email, id).toPromise();
    if (disponivel) {
      this.mensagem.sucesso('E-mail disponível');
    } else {
      this.mensagem.erro('E-mail indisponível');
    }
  }

  public sugereLogin(usuario: Usuario): void {
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
