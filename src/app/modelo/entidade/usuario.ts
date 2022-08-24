import { Pessoa } from './pessoa';

export class Usuario {
  id: number;
  login: string;
  senha: string;
  foto: string;
  email: string;
  pessoa: Pessoa;
  perfil: string;
  ativo: string;
  recuperarSenhaToken: string;
  recuperarSenhaExpira: string;
}
