import { EntidadeId } from '../entidade-id';

export class Endereco implements EntidadeId {

    public id: number;
    public logradouro: string;
    public complemento: string;
    public numero: string;
    public bairro: string;
    public cidade: string;
    public uf: string;
    public cep: string;

}
