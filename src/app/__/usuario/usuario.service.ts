import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Usuario } from '../../comum/modelo/entidade/usuario';
import { UsuarioFiltroDTO } from '../../comum/modelo/dto/usuario.filtro.dto';

@Injectable()
export class UsuarioCrudService extends ServicoCrudService<Usuario, UsuarioFiltroDTO> {

  constructor() {
    super('usuario');

    this.filtro = new UsuarioFiltroDTO();
  }

  public loginDisponivel(login: string, id: number) {
    let param = `?login=${encodeURIComponent(login)}`;
    if (id) {
      param += `&id=${encodeURIComponent(id)}`;
    }

    return this.http.get<boolean>(
      `${environment.REST_API_URL}/${this.funcionalidade}/login-disponivel${param}`,
      { headers: this.loginService.apiRequestHttpHeader }
    );
  }

  public pessoaDisponivel(pessoaId: number, id: number) {
    let param = `?pessoa-id=${encodeURIComponent(pessoaId)}`;
    if (id) {
      param += `&id=${encodeURIComponent(id)}`;
    }

    return this.http.get<boolean>(
      `${environment.REST_API_URL}/${this.funcionalidade}/pessoa-disponivel${param}`,
      { headers: this.loginService.apiRequestHttpHeader }
    );
  }

  public emailDisponivel(email: string, id: number) {
    let param = `?email=${encodeURIComponent(email)}`;
    if (id) {
      param += `&id=${encodeURIComponent(id)}`;
    }

    return this.http.get<boolean>(
      `${environment.REST_API_URL}/${this.funcionalidade}/email-disponivel${param}`,
      { headers: this.loginService.apiRequestHttpHeader }
    );
  }

  public reiniciarSenha(usuarioId: number) {
    return this.http.put<void>(
      `${environment.REST_API_URL}/${this.funcionalidade}/reiniciar-senha`,
      { id: usuarioId },
      { headers: this.loginService.apiRequestHttpHeader }
    );
  }

}
