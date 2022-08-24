import { EntidadeId } from '../entidade-id';
import { Pessoa } from './pessoa';
import { EventoPessoaFuncao } from './evento-pessoa-funcao';
import { EventoProduto } from './evento-produto';
import { Evento } from './evento';

export class EventoPessoa implements EntidadeId {

    public id: number;
    public evento: Evento;
    public pessoa: Pessoa;
    public eventoPessoaFuncao: EventoPessoaFuncao;
    public eventoProdutoList: EventoProduto[] = [];

}