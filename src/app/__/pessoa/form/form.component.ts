import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PessoaCrudService } from '../pessoa.service';
import { PessoaFormService } from '../pessoa-form.service';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { Cliente } from '../../../comum/modelo/entidade/cliente';
import { Fornecedor } from '../../../comum/modelo/entidade/fornecedor';
import { Parceiro } from '../../../comum/modelo/entidade/parceiro';
import { PessoaEndereco } from '../../../comum/modelo/entidade/pessoa-endereco';
import { deEnumParaChaveValor, formataCpfCnpj, formataCpf, formataCnpj, formataTelefone, formataCep } from '../../../comum/ferramenta/ferramenta-comum';
import { ParceiroFuncao } from './../../../comum/modelo/dominio/parceiro-funcao';
import { PessoaTipo } from '../../../comum/modelo/dominio/pessoa-tipo';
import { ConsultaCepService, Cep } from 'src/app/comum/servico/consulta-cep.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public prod = environment.production;

  public frm: FormGroup = this._formService.criarFormulario(new Pessoa());

  public isEnviado = false;
  public id: number;

  public enderecoEditando = false;

  public parceiroFuncaoList: any;
  public pessoaTipoList: any;

  private _cliente: boolean;
  private _fornecedor: boolean;
  private _parceiro: boolean;

  constructor(
    private _service: PessoaCrudService,
    private _formService: PessoaFormService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
    private _consultaCepService: ConsultaCepService,
  ) {
    this.parceiroFuncaoList = deEnumParaChaveValor(ParceiroFuncao);
    this.pessoaTipoList = deEnumParaChaveValor(PessoaTipo);
  }

  ngOnInit() {
    this._route.params.subscribe(p => {
      this.id = p.id;
    });

    this._route.data.subscribe((info) => {
      info.resolve.principal.subscribe((p: Pessoa) => {
        this._service.entidade = p;
        this.carregar(this._service.entidade);
      });
    });
  }

  public get acao() {
    return this._service.acao;
  }

  get pessoaEnderecoList(): FormArray {
    return this.frm.get('pessoaEnderecoList') as FormArray;
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

  public carregar(f: Pessoa) {
    if (!f) {
      f = new Pessoa();
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

  public novoEndereco(event) {
    event.preventDefault();
    const e = new PessoaEndereco();
    const reg = this._formService.criarFormularioPessoaEndereco(e);
    this.enderecoEditando = true;
    reg['editar'] = true;
    this.pessoaEnderecoList.push(reg);
  }

  public salvarEndereco(reg) {
    delete reg['anterior'];
    reg['editar'] = false;
    this.enderecoEditando = false;
  }

  public editarEndereco(reg) {
    reg['anterior'] = reg.value;
    reg['editar'] = true;
    this.enderecoEditando = true;
  }

  public excluirEndereco(idx) {
    this.pessoaEnderecoList.removeAt(idx);
    this.enderecoEditando = false;
  }

  public cancelarEndereco(reg) {
    if (this.pessoaEnderecoList.at(reg)['anterior']) {
      const vlr = this.pessoaEnderecoList.at(reg)['anterior'];
      this.pessoaEnderecoList.at(reg).setValue(vlr);
      this.pessoaEnderecoList.at(reg)['editar'] = false;
      delete this.pessoaEnderecoList.at(reg)['anterior'];
    } else {
      this.pessoaEnderecoList.removeAt(reg);
    }
    this.enderecoEditando = false;
  }

  get cliente(): FormGroup {
    return this.frm.get('cliente') as FormGroup;
  }

  get fornecedor(): FormGroup {
    return this.frm.get('fornecedor') as FormGroup;
  }

  get parceiro(): FormGroup {
    return this.frm.get('parceiro') as FormGroup;
  }

  public get isCliente(): boolean {
    if (this._cliente === undefined) {
    }
    this._cliente = this.cliente.value !== null;
    return this._cliente;
  }

  public set isCliente(is: boolean) {
    let v = null;
    if (is) {
      v = new Cliente();
      v.id = this.frm.value.id;
    }
    this.frm.setControl('cliente', this._formService.criarFormularioCliente(v));
    this._cliente = is;
  }

  public get isFornecedor(): boolean {
    if (this._fornecedor === undefined) {
    }
    this._fornecedor = this.fornecedor.value !== null;
    return this._fornecedor;
  }

  public set isFornecedor(is: boolean) {
    let v = null;
    if (is) {
      v = new Fornecedor();
      v.id = this.frm.value.id;
    }
    this.frm.setControl('fornecedor', this._formService.criarFormularioFornecedor(v));
    this._fornecedor = is;
  }

  public get isParceiro(): boolean {
    if (this._parceiro === undefined) {
    }
    this._parceiro = this.parceiro.value !== null;
    return this._parceiro;
  }

  public set isParceiro(is: boolean) {
    let v = null;
    if (is) {
      v = new Parceiro();
      v.id = this.frm.value.id;
      v.funcao = null;
    }
    this.frm.setControl('parceiro', this._formService.criarFormularioParceiro(v));
    this._parceiro = is;
  }

  public buscaCep(endereco: FormGroup) {
    const cep = endereco.value.cep;
    this._consultaCepService.buscarPorCep(cep)
      .then((r: Cep) => {
        endereco.controls.logradouro.setValue(r.logradouro);
        endereco.controls.bairro.setValue(r.bairro);
        endereco.controls.cidade.setValue(r.localidade);
        endereco.controls.uf.setValue(r.uf);
        endereco.controls.cep.setValue(r.cep);
      })
      .catch(e => this._mensagem.erro(`CEP: ${cep} -> ${e}`));
  }

  public formataCpfCnpj(pessoaTipo, cpfCnpj) {
    if ('PF' === pessoaTipo.value) {
      cpfCnpj.setValue(formataCpf(cpfCnpj.value));
    } else if ('PF' === pessoaTipo.value) {
      cpfCnpj.setValue(formataCnpj(cpfCnpj.value));
    } else {
      cpfCnpj.setValue(formataCpfCnpj(cpfCnpj.value));
    }
  }

  public formataTelefone(telefone) {
    telefone.setValue(formataTelefone(telefone.value));
  }

  public formataCep(cep) {
    cep.setValue(formataCep(cep.value));
  }

}
