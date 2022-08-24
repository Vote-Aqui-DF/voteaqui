import { MensagemService } from './../../comum/servico/mensagem/mensagem.service';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { FormComponent } from './form.component';

@Injectable({ providedIn: 'root' })
export class FormSairGuard implements CanDeactivate<FormComponent>  {

  constructor(
    private _mensagem: MensagemService
  ) { }

  canDeactivate(
    component: FormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean |
    import('@angular/router').UrlTree |
    import('rxjs').Observable<boolean |
    import('@angular/router').UrlTree> | Promise<boolean |
      import('@angular/router').UrlTree> {
    console.log('FORM sair');
    if (component.frm.dirty) {
      return this._mensagem.confirme('Anteção! Dados não salvos serão perdidos');
    }
    return true;
  }

}
