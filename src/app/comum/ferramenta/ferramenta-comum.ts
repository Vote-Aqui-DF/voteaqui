import { AbstractControl, Validators } from '@angular/forms';

export function gerarFormulario<T>(entidade: T) {
    const result = {};
    const campos = Object.getOwnPropertyNames(entidade);

    for (let i = 0; i < campos.length; i++) {
        result[campos[i]] = [entidade[campos[i]], []];
    }
    return result;
}

export function findIndexById(lista: any[], id: number): number {
    let result: number = null;
    if (!lista || !id) {
        return result;
    }
    for (let i = 0; i < lista.length; i++) {
        if (lista[i]['id'] && lista[i]['id'] == id) {
            result = i;
            break
        }
    }
    return result;
}

export function deepCopy(obj: any) {
    let copy: any;

    if (null === obj || 'object' !== typeof obj) {
        return obj;
    }
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = deepCopy(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error('Impossível copiar objeto! Tipo não suportado.');
}

export function isNumber(value: string | number): boolean {
    return ((value != null) &&
        (value !== '') &&
        !isNaN(Number(value.toString())));
}

export function hojeStr() {
    const data = new Date();
    return `${('0' + data.getDate()).substr(-2)}/${('0' + (data.getMonth() + 1)).substr(-2)}/${data.getFullYear()}`;
}

export function deEnumParaChaveValor(e: any): any {
    return Object.keys(e).map(key => {
        return {
            chave: key,
            valor: e[key]
        };
    });
}

export const IMAGE_MIME_DEFAULT = 'data:image/jpeg;base64,';

export function adMime(v: string) {
    if (v && !v.startsWith(IMAGE_MIME_DEFAULT.substr(0, 5))) {
        v = IMAGE_MIME_DEFAULT + v;
    }
    return v;
}

export function removeMime(v: string) {
    if (v && v.startsWith(IMAGE_MIME_DEFAULT.substr(0, 5))) {
        v = v.substr(v.indexOf(',') + 1, v.length);
    }
    return v;
}

export function formataCpfCnpj(valor: string) {
    if (!valor) {
        return valor;
    }
    valor = valor.replace(/\D/g, '');
    if (!valor) {
        return valor;
    }
    return (valor.length <= 11) ? formataCpf(valor) : formataCnpj(valor);
}
export function formataCpf(valor: string) {
    if (!valor) {
        return valor;
    }
    valor = valor.replace(/\D/g, '');
    if (!valor) {
        return valor;
    }
    valor = '00000000000'.concat(valor).slice(-11);
    valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (regex, a1, a2, a3, a4) => `${a1}.${a2}.${a3}-${a4}`);
    return valor;
}

export function formataCnpj(valor: string) {
    if (!valor) {
        return valor;
    }
    valor = valor.replace(/\D/g, '');
    if (!valor) {
        return valor;
    }
    valor = '00000000000000'.concat(valor).slice(-14);
    valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, (regex, a1, a2, a3, a4, a5) => `${a1}.${a2}.${a3}/${a4}-${a5}`);
    return valor;
}

export function isCpfValido() {
    return (control: AbstractControl): Validators => {
        const cpf = control.value;
        if (cpf) {
            return validarCPF(cpf) ? null : { cpfNotValid: true };
        }
        return null;
    };
}

export function isCnpjValido() {
    return (control: AbstractControl): Validators => {
        const cnpj = control.value;
        if (cnpj) {
            return validarCNPJ(cnpj) ? null : { cnpjNotValid: true };
        }
        return null;
    };
}

export function isCpfCnpjValido() {
    return (control: AbstractControl): Validators => {
        const cpfCnpj = control.value;
        if (cpfCnpj) {
            return validarCPF(cpfCnpj) || validarCNPJ(cpfCnpj) ? null : { cpfCnpjNotValid: true };
        }
        return null;
    };
}

export function isPessoaValido() {
    return (control: AbstractControl): Validators => {
        const pessoa = control.value;
        return pessoaValida(pessoa) ? null : { pessoaNotValid: true };
    };
}

export function pessoaValida(pessoa) {
    return pessoa && !(typeof pessoa === 'string');
}

export function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') {
        return false;
    }
    if ((cpf.length !== 11) ||
        (cpf === '00000000000') ||
        (cpf === '11111111111') ||
        (cpf === '22222222222') ||
        (cpf === '33333333333') ||
        (cpf === '44444444444') ||
        (cpf === '55555555555') ||
        (cpf === '66666666666') ||
        (cpf === '77777777777') ||
        (cpf === '88888888888') ||
        (cpf === '99999999999')) {
        return false;
    }
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) {
        add += Number(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== Number(cpf.charAt(9))) {
        return false;
    }
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
        add += Number(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    return rev !== Number(cpf.charAt(10)) ? false : true;
}

export function validarCNPJ(cnpj) {
    const valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
    let dig1 = 0;
    let dig2 = 0;
    const exp = /\.|\-|\//g;
    cnpj = cnpj.toString().replace(exp, '');
    const digito = Number(cnpj.charAt(12) + cnpj.charAt(13));
    for (let i = 0; i < valida.length; i++) {
        dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
        dig2 += cnpj.charAt(i) * valida[i];
    }
    dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
    dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));
    return (((dig1 * 10) + dig2) !== digito) ? false : true;
}

export function formataTelefone(valor: string) {
    if (!valor) {
        return valor;
    }
    valor = valor.replace(/\D/g, '');
    if (!valor) {
        return valor;
    }
    if (valor.length === 8) {
        return valor.replace(/(\d{4})(\d{4})/, (regex, a1, a2) => `${a1}-${a2}`);
    } else if (valor.length === 9) {
        return valor.replace(/(\d{5})(\d{4})/, (regex, a1, a2) => `${a1}-${a2}`);
    } else if (valor.length === 10) {
        return valor.replace(/(\d{2})(\d{4})(\d{4})/, (regex, a1, a2, a3) => `(${a1}) ${a2}-${a3}`);
    } else if (valor.length === 11) {
        return valor.replace(/(\d{2})(\d{5})(\d{4})/, (regex, a1, a2, a3) => `(${a1}) ${a2}-${a3}`);
    } else {
        return valor;
    }
}

export function formataCep(valor: string) {
    if (!valor) {
        return valor;
    }
    valor = valor.replace(/\D/g, '');
    if (!valor) {
        return valor;
    }
    if (valor.length === 8) {
        return valor.replace(/(\d{5})(\d{3})/, (regex, a1, a2) => `${a1}-${a2}`);
    } else {
        return valor;
    }
}

export function sugereLogin(nome: string) {
    const nomes = nome.trim().toLowerCase().split(' ');
    if (nomes.length === 0 || nomes.length === 1) {
        return nomes[0].replace(/\W/g, '');
    } else {
        return `${nomes[0].replace(/\W/g, '')}.${nomes[nomes.length - 1].replace(/\W/g, '')}`;
    }
}

export function data(vlr): Date {
  if (!vlr) {
    return vlr;
  }
  if (!(vlr instanceof Date)) {
    vlr = vlr.split('-');
    vlr = new Date(vlr[0], vlr[1] - 1, vlr[2]);
  }
  return vlr;
}
