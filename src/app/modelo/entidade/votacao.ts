import { Pauta } from './pauta';
import { Participante } from './participante';

export class Votacao {
  public id: number;
  public codigo: string;
  public nome: string;
  public descricao: string;
  public senha: string;
  public senhaTentativa: number;
  public senhaBloqueio: string;
  public senhaTotDesbloqueio: number;
  public inicio: string;
  public termino: string;
  public situacao: string;
  public pautaLista: Pauta[] = [];
  public participanteLista: Participante[] = [];
}
