import { Endereco } from './endereco';
import { Evento } from './evento';

export class Vender extends Evento {

    public id: number;
    public endereco: Endereco;

}
