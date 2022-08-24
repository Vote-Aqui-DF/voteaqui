import { EntidadeId } from '../entidade-id';
import { Confirmacao } from '../dominio/confirmacao';

export class UnidadeMedida implements EntidadeId {

    public id: number;
    public nome: string;
    public codigo: string;
    public base: Confirmacao;
    public valorBase: number;
    public pai: UnidadeMedida;

}