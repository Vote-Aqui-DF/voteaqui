import { Opcao } from './opcao';

export class Pauta {
  public id: number;
  public codigo: string;
  public nome: string;
  public descricao: string;
  public quantidadeEscolha: number;
  public opcaoLista: Opcao[] = [];
}
