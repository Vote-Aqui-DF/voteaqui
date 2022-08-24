import { FiltroIdDTO } from './filtro-id.dto';
import { Confirmacao } from '../dominio/confirmacao';

export class ProdutoModeloFiltroDTO extends FiltroIdDTO {

    nome: string;
    codigo: string;
    materiaPrima: Confirmacao | string;

}
