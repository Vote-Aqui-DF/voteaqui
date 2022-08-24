import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigService } from './../config.service';
import { Participante } from './../../modelo/entidade/participante';
import { Opcao } from './../../modelo/entidade/opcao';
import { Pauta } from './../../modelo/entidade/pauta';
import { Votacao } from './../../modelo/entidade/votacao';
import { AlterarSenhaComponent } from './../../cedula/alterar-senha/alterar-senha.component';
import { MensagemService } from './../../comum/servico/mensagem/mensagem.service';
import { environment } from './../../../environments/environment';
import { ConfirmarVotoComponent } from './../../cedula/confirmar-voto/confirmar-voto.component';
import { MensagemParticipanteComponent } from './../../cedula/mensagem-participante/mensagem-participante.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public id: number;
  public entidade: Votacao = null;
  public frm: FormGroup = this.carregar(new Votacao());

  public filtro = '';
  public filtroTexto = '';
  public selecionaTodos = false;
  public qtdSelecao: number = 10;
  public comTelefoneSelecao = true;
  public comEmailSelecao = true;
  public selecaoIni = -1;
  public selecaoFim = -1;

  constructor(
    private fb: FormBuilder,
    private servico: ConfigService,
    private _route: ActivatedRoute,
    private _router: Router,
    private mensagem: MensagemService,
  ) { }

  agora(): Date {
    return new Date();
  }

  ngOnInit(): void {
    this._route.params.subscribe(p => {
      this.id = p.id;
      if (this.id) {
        this._route.data.subscribe((info) => {
          info.dados.subscribe(async (d) => {
            this.entidade = d;
            if (this.entidade.id) {
              let retorno = null;
              let pagina = 0;
              do {
                retorno = await this.servico.listParticipante(this.entidade.id, pagina++).toPromise();
                if (retorno && retorno.length) {
                  if (!this.entidade.participanteLista) {
                    this.entidade.participanteLista = [];
                  }
                  for (let r of retorno) {
                    this.entidade.participanteLista.push(r);
                  }
                }
              } while (retorno && retorno.length);
            }
            this.frm = this.carregar(this.entidade);
          }, (e) => {
            this.mensagem.erro('Acesso não autorizado');
            this._router.navigate(['/config']);
          });

        });
      }
    });
  }

  private carregar(votacao: Votacao): FormGroup {
    return this.criarVotacao(votacao);
  }

  getLista(frm: FormGroup, lista: string): FormArray {
    return frm.get(lista) as FormArray;
  }

  private criarVotacao(votacao: Votacao): FormGroup {
    const result = this.fb.group({
      id: [votacao.id, []],
      codigo: [votacao.codigo, [Validators.required, Validators.pattern(/^[\w]+$/)]],
      nome: [votacao.nome, [Validators.required]],
      descricao: [votacao.descricao, [Validators.required]],
      senha: [votacao.senha, [Validators.required]],
      inicio: [votacao.inicio, [Validators.required]],
      termino: [votacao.termino, [Validators.required]],
      pautaLista: this.criarPautaLista(votacao.pautaLista),
      participanteLista: this.criarParticipanteLista(votacao.participanteLista),
    });
    if (votacao.id) {
      result.get('senha').clearValidators();
    }
    return result;
  }

  private criarPautaLista(lista: Pauta[]): FormArray {
    const items = [];
    if (lista && lista.length) {
      lista.forEach(e => items.push(this.criarPauta(e)));
    }
    const result = this.fb.array(items, [Validators.required]);
    return result;
  }

  private criarPauta(valor: Pauta): FormGroup {
    const result = this.fb.group({
      id: [valor.id, []],
      codigo: [valor.codigo, [Validators.required, Validators.pattern(/^[\w]+$/)]],
      nome: [valor.nome, [Validators.required]],
      descricao: [valor.descricao, [Validators.required]],
      quantidadeEscolha: [valor.quantidadeEscolha, [Validators.required, Validators.pattern(/^[1-9]+[\d]*$/), Validators.min(1),
      Validators.max(20)]],
      opcaoLista: this.criarOpcaoLista(valor.opcaoLista),
    });
    return result;
  }

  private criarOpcaoLista(lista: Opcao[]): FormArray {
    const items = [];
    if (lista && lista.length) {
      lista.forEach(e => items.push(this.criarOpcao(e)));
    }
    const result = this.fb.array(items, [Validators.required]);
    return result;
  }

  private criarOpcao(valor: Opcao): FormGroup {
    const result = this.fb.group({
      id: [valor.id, []],
      codigo: [valor.codigo, [Validators.required, Validators.pattern(/^[\w]+$/)]],
      nome: [valor.nome, [Validators.required]],
      descricao: [valor.descricao, [Validators.required]],
    });
    return result;
  }

  private criarParticipanteLista(lista: Participante[]): FormArray {
    const items = [];
    if (lista && lista.length) {
      lista.forEach(e => items.push(this.criarParticipante(e)));
    }
    const result = this.fb.array(items, [Validators.required]);
    return result;
  }

  private criarParticipante(valor: Participante): FormGroup {
    const result = this.fb.group({
      id: [valor.id, []],
      identificacao: [valor.identificacao, [Validators.required, Validators.pattern(/(^[1-9][\d]*[\dxX]$)|^[1-9]$/)]],
      nome: [valor.nome, [Validators.required]],
      telefone: [valor.telefone, [Validators.pattern(/^[1-9]+[\d]*$/)]],
      email: [valor.email, [Validators.email]],
      senhaTentativa: [valor.senhaTentativa, []],
      senhaBloqueio: [valor.senhaBloqueio, []],
      senhaTotDesbloqueio: [valor.senhaTotDesbloqueio, []],
      votou: [valor.votou, []],
    });
    return result;
  }

  pautaIncluir(frm: FormGroup): void {
    const reg = this.criarPauta(new Pauta());
    reg['editando'] = true;
    (frm.get('pautaLista') as FormArray).push(reg);
  }

  pautaSalvar(reg: FormGroup): void {
    reg['editando'] = false;
  }

  pautaEditar(reg: FormGroup): void {
    reg['editando'] = true;
  }

  async pautaExcluir(frm: FormGroup, pos): Promise<any> {
    if (await this.mensagem.confirme('Confirme a exclusão!')) {
      (frm.get('pautaLista') as FormArray).removeAt(pos);
    }
  }

  opcaoIncluir(frm: FormGroup): void {
    const reg = this.criarOpcao(new Opcao());
    reg['editando'] = true;
    (frm.get('opcaoLista') as FormArray).push(reg);
  }

  opcaoSalvar(reg: FormGroup): void {
    reg['editando'] = false;
  }

  opcaoEditar(reg: FormGroup): void {
    reg['editando'] = true;
  }

  async opcaoExcluir(frm: FormGroup, pos): Promise<any> {
    if (await this.mensagem.confirme('Confirme a exclusão!')) {
      (frm.get('opcaoLista') as FormArray).removeAt(pos);
    }
  }

  participanteIncluir(frm: FormGroup): void {
    const reg = this.criarParticipante(new Participante());
    reg['editando'] = true;
    (frm.get('participanteLista') as FormArray).push(reg);
  }

  participanteSalvar(reg: FormGroup): void {
    reg['editando'] = false;
  }

  participanteEditar(reg: FormGroup): void {
    reg['editando'] = true;
  }

  async participanteExcluir(participanteControl: FormGroup): Promise<any> {
    if (participanteControl.invalid) {
      this.mensagem.erro('Não é possível excluir este registro');
      return;
    }
    if (await this.mensagem.confirme('Confirme a exclusão!')) {
      participanteControl.addControl('exclui', new FormControl(true, []));
    }
  }

  lerArquivo(event): void {
    const arquivo: FileReader = new FileReader();
    arquivo.onloadend = (e) => {
      for (let p of (this.frm.get('participanteLista') as FormArray).controls) {
        (p as FormGroup).addControl('exclui', new FormControl(true, []));
      }
      const linhas = (arquivo.result as string).split(/\r\n|\n/);
      let identificacao = -1;
      let nome = -1;
      let telefone = -1;
      let email = -1;
      linhas.forEach(l => {
        const colunas = l.split(/;/);
        if (identificacao === -1) {
          for (let p = 0; p < colunas.length; p++) {
            if (colunas[p] === 'identificacao') {
              identificacao = p;
              continue;
            }
            if (colunas[p] === 'nome') {
              nome = p;
              continue;
            }
            if (colunas[p] === 'telefone') {
              telefone = p;
              continue;
            }
            if (colunas[p] === 'email' || colunas[p] === 'e-mail') {
              email = p;
              continue;
            }
          }
        } else {
          if (colunas[identificacao] && colunas[identificacao].trim().length) {
            let encontrou = false;
            for (let rr of (this.frm.get('participanteLista') as FormArray).controls) {
              if (colunas[identificacao] === rr.value.identificacao) {
                encontrou = true;
                console.log(`identificacao duplicada [${colunas[identificacao]}]. registro ignorado`);
                break;
              }
            }
            if (!encontrou) {
              const participante = new Participante();
              participante.identificacao = identificacao < 0 ? null : colunas[identificacao];
              participante.nome = nome < 0 ? null : colunas[nome];
              participante.telefone = telefone < 0 ? null : this.formataTelefone1(colunas[telefone]);
              participante.email = email < 0 ? null : colunas[email];
              const reg = this.criarParticipante(participante);
              (this.frm.get('participanteLista') as FormArray).push(reg);
            }
          }
        }
      });
    };

    arquivo.readAsText(event.target.files[0]);
  }

  async enviar(event): Promise<any> {
    event.preventDefault();
    if (this.frm.invalid) {
      const msg = 'Dados inválidos. Corrija-os antes de enviar.';
      this.mensagem.erro(msg);
      throw new Error(msg);
    }
    this.entidade = this.frm.value;
    const participanteListaTemp = this.entidade.participanteLista;
    this.entidade.participanteLista = [];
    if (!this.entidade.id) {
      this.servico.create(this.entidade as Votacao).subscribe(async (r) => {
        // salvar todos os participantes, um a um
        for (let participante of participanteListaTemp) {
          if (!participante['exclui']) {
            try {
              let idSalvo = await this.servico.createParticipante(participante, r).toPromise();
              participante.id = idSalvo;
            } catch (err) {
              console.log(err);
              this.mensagem.erro(`Erro ao processar Participantes. (${JSON.stringify(err)})`);
              throw err;
            }
          }
        }
        this.mensagem.sucesso('Sucesso. As informações foram salvas!');
        this.frm.markAsPristine();
        this._router.navigate(['/config']);
      }, (err) => {
        console.log(err);
        this.mensagem.erro(`Erro ao processar. (${JSON.stringify(err)})`);
      });
    } else {
      const senha = await this.mensagem.confirmeModelo('Digite a senha de acesso', ConfirmarVotoComponent);
      if (!senha || !senha.trim().length) {
        return;
      }
      this.servico.update(this.entidade as Votacao, senha).subscribe(async (r) => {
        for (let participante of participanteListaTemp) {
          try {
            if (participante.id) {
              if (participante['exclui']) {
                await this.servico.deleteParticipante(participante.id).toPromise();
              } else {
                // verificar se o registro foi alterado
                let alterado = false;
                for (let i = 0; i < (this.frm.get('participanteLista') as FormArray).controls.length; i++) {
                  let p = (this.frm.get('participanteLista') as FormArray).controls[i];
                  if (participante.id === p.value.id) {
                    if (p.dirty) {
                      alterado = true;
                    }
                    break;
                  }
                }
                if (alterado) {
                  await this.servico.updateParticipante(participante, r).toPromise();
                }
              }
            } else {
              if (!participante['exclui']) {
                let idSalvo = await this.servico.createParticipante(participante, r).toPromise();
                participante.id = idSalvo;
              }
            }
          } catch (err) {
            console.log(err);
            this.mensagem.erro(`Erro ao processar Participantes. (${JSON.stringify(err)})`);
            throw err;
          }
        }
        this.mensagem.sucesso('Sucesso. As informações foram salvas!');
        this.frm.markAsPristine();
        this._router.navigate(['/config']);
      }, (err) => {
        console.log(err);
        this.mensagem.erro(`Erro ao processar. (${JSON.stringify(err)})`);
      });
    }
  }

  filtrar(participante: any, params): boolean {
    return !participante.value.exclui && ((!params[0] || params[0].trim().length === 0 ||
      (params[0] === 'V' && participante.value.votou) ||
      (params[0] === 'N' && !participante.value.votou)) &&
      (!params[1] || params[1].trim().length === 0 ||
        participante.value.nome.trim().toLowerCase().indexOf(params[1].toLowerCase()) >= 0 ||
        participante.value.identificacao.trim().toLowerCase().indexOf(params[1].toLowerCase()) >= 0
      ));
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

  async alterarSenha(): Promise<void> {
    const votacao = this.frm.value;
    const senhas = await this.mensagem.confirmeModelo('Digite', AlterarSenhaComponent);
    if (senhas) {
      if (!senhas.senhaAtual || !senhas.senhaNova) {
        this.mensagem.erro('Senhas não informadas!');
      } else {
        this.servico.alterarSenha(votacao.id, senhas).subscribe((r) => {
          this.mensagem.sucesso('Senha Alterada com sucesso!');
        }, (e) => {
          this.mensagem.erro('Erro ao alterar senha');
          console.log(e);
        });
      }
    }
  }

  async enviarMensagem(meio: string): Promise<any> {
    const votacao = this.frm.value;
    const lista = this.frm.get('participanteLista').value;
    const participanteIdLista = [];

    if (lista && lista.length && await this.mensagem.confirme(`Confirma o envio do link, a todos os participantes selecionados, por ${meio}?`)) {
      let msgEnvio: string = await this.mensagem.confirmeModelo('Digite a mensagem ou deixe em branco para enviar a cédula', MensagemParticipanteComponent);
      const senha = await this.mensagem.confirmeModelo('Digite a senha de acesso', ConfirmarVotoComponent);
      if (!senha) {
        return;
      }
      lista.forEach((v: Participante) => {
        if (v['selecao']) {
          participanteIdLista.push(v.id);
        }
      });
      this.servico.enviarMensagem({
        meio,
        senha,
        votacao: {
          id: votacao.id,
          nome: votacao.nome
        },
        API_URL: environment.API_URL,
        participanteIdLista,
        msg: msgEnvio
      }).subscribe(result => {
        if (meio === 'email') {
          this.mensagem.sucesso('E-mails enviados!!!');
        } else if (meio === 'whatsapp') {
          for (const r of result) {
            new Promise((resolve, reject) => {
              window.open(r.url, '_blank');
              resolve(true);
            }).then(enviou => console.log(enviou));
          }
          this.mensagem.sucesso('WhatsApp enviados!!!');
        } else if (meio === 'sms') {
          this.mensagem.sucesso('SMSs enviados!!!');
        }
      }, e => {
        this.mensagem.erro('Erro no envio das cédulas!!!');
        console.log(e);
      });
    }
  }

  desbloquear(participanteId): void {
    this.servico.desbloquear(participanteId).subscribe(
      (r) => {
        this.mensagem.sucesso('Desbloqueio realizado com sucesso!');
        window.location.reload();
      },
      (e) => {
        this.mensagem.erro('Erro ao desbloquear');
        console.log(e);
      });
  }

  selecionarRegs(event, reg) {
    event.preventDefault();
    let encontrou = false;
    let cont = this.qtdSelecao;
    this.selecaoIni = -1, this.selecaoFim = -1;
    for (let i = 0; i < (this.frm.get('participanteLista') as FormArray).controls.length; i++) {
      let p = (this.frm.get('participanteLista') as FormArray).controls[i];
      if (reg.value.identificacao === p.value.identificacao) {
        encontrou = true;
        this.selecaoIni = i + 1;
      }

      p.value.selecao = (encontrou &&
        (
          (!this.comTelefoneSelecao && !this.comEmailSelecao) ||
          (
            (this.comTelefoneSelecao && this.comEmailSelecao && p.value.telefone && p.value.telefone.trim().length && p.value.email && p.value.email.trim().length) ||
            (this.comTelefoneSelecao && !this.comEmailSelecao && p.value.telefone && p.value.telefone.trim().length) ||
            (!this.comTelefoneSelecao && this.comEmailSelecao && p.value.email && p.value.email.trim().length)
          )
        ) &&
        cont-- > 0);

      if (cont === 0 && this.selecaoFim === -1) {
        this.selecaoFim = i + 1;
      }
    }
  }

}
