import { EntidadeId } from '../entidade-id';
import { Evento } from './evento';
import { Produto } from './produto';
import { UnidadeMedida } from './unidade-medida';
import { EventoPessoa } from './evento-pessoa';

export class EventoProduto implements EntidadeId {

    public id: number;
    public evento: Evento;
    public produto: Produto;
    public quantidade: number;
    public unidadeMedida: UnidadeMedida;
    public valorUnitario: number;
    public valorTotal: number;
    public eventoPessoa: EventoPessoa;

}