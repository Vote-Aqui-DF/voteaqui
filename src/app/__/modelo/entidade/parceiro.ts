import { ParceiroFuncao } from './../dominio/parceiro-funcao';
import { EntidadeId } from '../entidade-id';

export class Parceiro implements EntidadeId {

    public id: number;
    public funcao: ParceiroFuncao;

}