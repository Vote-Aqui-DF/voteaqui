import { RestApiError } from './rest-api-error';
import { MensagemService } from './../mensagem/mensagem.service';
import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {

    constructor(private _mensagem: MensagemService) {
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Erro: ${error.error.message}`;
                    } else if (error.error.restapierror) {
                        const e = new RestApiError(error.error.restapierror);
                        errorMessage = `Mensagem: ${e.restapierror.debugMessage}`;
                        this._mensagem.erroGrave(errorMessage, 'Erro ao acessar o servidor');
                        errorMessage = '';
                    } else {
                        // server-side error
                        errorMessage = `Estatus do Erro: ${error.status}\nMensagem: ${error.message}`;
                    }
                    if (errorMessage) {
                        this._mensagem.erro(errorMessage);
                    }
                    console.error(error);
                    return throwError(error);
                })
            );
    }
}
