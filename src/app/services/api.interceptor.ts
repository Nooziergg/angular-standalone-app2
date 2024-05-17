import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

/**
 * Interceptor para requisições da API.
 * Este interceptor adiciona um cabeçalho de Autorização à requisição antes de enviá-la.
 */
@Injectable() // O decorador @Injectable é necessário para que a classe possa ser injetada em outros serviços
//Injeção de dependência é um padrão de projeto de software que permite a criação de objetos dependentes de forma dinâmica.
//Em vez de criar um objeto diretamente, o objeto é criado por um fornecedor de serviços.
//O fornecedor de serviços é responsável por criar e gerenciar os objetos dependentes.

export class ApiInterceptor implements HttpInterceptor {

constructor() {}

/**
 * Intercepta a requisição HTTP e a modifica, se necessário.
 * Adiciona um cabeçalho de Autorização à requisição.
 * Trata erros que ocorrem durante a requisição.
 * @param request - A requisição HTTP original.
 * @param next - O próximo manipulador HTTP na cadeia.
 * @returns Um observable do evento HTTP.
 */
intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   // Modifique a requisição aqui, se necessário, por exemplo, adicione cabeçalhos
   const modifiedReq = request.clone({
    headers: request.headers.set('Authorization', `Bearer seu-token-aqui`)
  });

  return next.handle(modifiedReq).pipe(
    retry(1), // Tentar novamente uma vez antes de falhar
    catchError((error: HttpErrorResponse) => {
      console.error('Erro do interceptor', error);
      return throwError(() => error); // Relança o erro (talvez você queira lançar um erro personalizado em vez disso)
    })
  );
}
}
