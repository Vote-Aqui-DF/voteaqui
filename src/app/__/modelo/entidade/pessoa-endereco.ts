import { Pessoa } from './pessoa'
import { Endereco } from './endereco';
import { EntidadeId } from '../entidade-id';

export class PessoaEndereco implements EntidadeId {

    public id: number;
    public pessoa: Pessoa;
    public endereco: Endereco;

}