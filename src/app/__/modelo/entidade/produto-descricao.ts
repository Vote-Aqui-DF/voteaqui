import { EntidadeId } from '../entidade-id';
import { ProdutoModelo } from './produto-modelo';
import { ProdutoAtributo } from './produto-atributo';

export class ProdutoDescricao implements EntidadeId {

    public id: number;
    public produtoModelo: ProdutoModelo;
    public produtoAtributo: ProdutoAtributo;
    public valor: string;
    public ordem: number;

}