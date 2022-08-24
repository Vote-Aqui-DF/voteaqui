import { Pessoa } from './../../modelo/entidade/pessoa';
import { Endereco } from './../../modelo/entidade/endereco';


export function pessoaListComparar(o1: Pessoa, o2: Pessoa) {
    const result = o1 && o2 ? o1.id === o2.id : o1 === o2;
    return result;
}

export function pessoaEnderecoListComparar(o1: Endereco, o2: Endereco) {
    const result = o1 && o2 ? o1.id === o2.id : o1 === o2;
    return result;
}

export function situacaoNome(sigla: string): string {
  switch (sigla) {
    case 'E': return 'Em andamento';
    case 'F': return 'Futura';
    case 'X': return 'Encerrada';
    default: return '';
  }
}
