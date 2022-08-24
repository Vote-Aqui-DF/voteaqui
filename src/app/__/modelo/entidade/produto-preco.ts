import { ProdutoModelo } from './produto-modelo';
import { EntidadeId } from '../entidade-id';

export class ProdutoPreco implements EntidadeId {

    public id: number;
    public produtoModelo: ProdutoModelo;
    public vigencia: string;
    public valor: string;
    public destinacao: string;

}