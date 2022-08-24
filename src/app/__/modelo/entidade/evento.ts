import { EntidadeId } from '../entidade-id';
import { EventoTipo } from './evento-tipo';
import { EventoPessoa } from './evento-pessoa';
import { EventoProduto } from './evento-produto';

export class Evento implements EntidadeId {

    public id: number;
    public eventoTipo: EventoTipo;
    public data: string;
    public paiId: number;
    public pai: Evento;
    public eventoPessoaList: EventoPessoa[] = [];
    public eventoProdutoList: EventoProduto[] = [];
    public eventoProdutoListTotal: number;

}
