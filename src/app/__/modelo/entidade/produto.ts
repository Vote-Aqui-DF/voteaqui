import { EntidadeId } from '../entidade-id';
import { ProdutoModelo } from './produto-modelo';

export class Produto implements EntidadeId {

    public id: number;
    public produtoModelo: ProdutoModelo;

}