import { FiltroIdDTO } from './filtro-id.dto';
import { PessoaTipo } from '../dominio/pessoa-tipo';

export class PessoaFiltroDTO extends FiltroIdDTO {

    nome: string;
    pessoaTipo: PessoaTipo;
    cpfCnpj: string;
    pessoaVinculoTipo: string[];

}
