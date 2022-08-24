import { Injectable } from '@angular/core';
import { NgxViacepService } from '@brunoc/ngx-viacep';

@Injectable({
    providedIn: 'root'
})
export class ConsultaCepService {

    constructor(
        private viacep: NgxViacepService
    ) {
    }

    buscarPorCep(cep: string) {
        return this.viacep.buscarPorCep(cep);
    }

}

export interface Cep {
    bairro: string;
    cep: string;
    complemento: string;
    gia: string;
    ibge: string;
    localidade: string;
    logradouro: string;
    uf: string;
    unidade: string;
}
