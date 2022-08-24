import { EntidadeId } from '../entidade-id';
import { Pessoa } from './pessoa';
import { Confirmacao } from '../dominio/confirmacao';

export class Usuario implements EntidadeId {

    public id: number;
    public pessoa: Pessoa;
    public login: string;
    public email: string;
    public foto: string;
    public perfil: string;
    public ativo: Confirmacao;

}
