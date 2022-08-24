export class Participante {
  public id: number;
  public identificacao: string;
  public nome: string;
  public telefone: string;
  public email: string;
  public senhaTentativa: number;
  public senhaBloqueio: string;
  public senhaTotDesbloqueio: number;
  public votou = false;
  constructor() {
  }
}
