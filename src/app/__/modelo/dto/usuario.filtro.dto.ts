import { FiltroIdDTO } from './filtro-id.dto';
import { Confirmacao } from '../dominio/confirmacao';

export class UsuarioFiltroDTO extends FiltroIdDTO {

    login: string;
    email: string;
    ativo: Confirmacao;
    perfil: string[];

}
