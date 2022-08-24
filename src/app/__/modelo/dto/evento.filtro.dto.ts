import { Confirmacao } from '../dominio/confirmacao';
import { FiltroIdDTO } from './filtro-id.dto';

export class EventoFiltroDTO extends FiltroIdDTO {

    dataInicio: string;
    dataTermino: string;
    produto: string;
    participante: string;
    utilizado: Confirmacao | string;

}
