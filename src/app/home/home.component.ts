import { MensagemService } from './../comum/servico/mensagem/mensagem.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public identificacao = null;

  public frm;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mensagem: MensagemService,
  ) { }

  ngOnInit(): void {
    this.frm = this.criarFrm();
  }

  criarFrm(): FormGroup {
    const result = this.formBuilder.group({
      identificacao: ['', [Validators.required, Validators.pattern(/(^[1-9][\d]*[\dxX]$)|^[1-9]$/)]],
    });
    return result;
  }

  pesquisar(): void {
    if (this.frm.invalid) {
      this.mensagem.erro('Dados inválidos!');
      return;
    }
    this.router.navigate(['../', this.frm.value.identificacao]);
  }

}
