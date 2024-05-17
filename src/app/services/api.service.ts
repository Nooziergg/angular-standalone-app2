import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HasId } from '../models/hasId';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Este é o serviço responsável por fazer chamadas HTTP para a API

  requisicao(method: string, endpoint: string, data?: any): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.request(method, url, {
      body: data,
    });
  }

  // Métodos de conveniência para fazer chamadas HTTP específicas

  get(endpoint: string): Observable<any> {
    return this.requisicao('GET', endpoint);
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.requisicao('POST', endpoint, data);
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.requisicao('PUT', endpoint, data);
  }

  delete(endpoint: string): Observable<any> {
    return this.requisicao('DELETE', endpoint);
  }
  // Métodos para operações com localStorage

  getItems<T>(key: string): Observable<T[]> {
    const items = localStorage.getItem(key);
    return of(items ? JSON.parse(items) : []);
  }

  addItem<T extends HasId>(key: string, item: Omit<T, 'id'>): Observable<T[]> {
    const items = this.getItemsFromStorage<T>(key);
    const newItem = { ...item, id: new Date().getTime() } as T;
    items.push(newItem);
    this.saveItemsToStorage(key, items);
    return of(items);
  }

  updateItem<T extends HasId>(key: string, updatedItem: T): Observable<T[]> {
    let items = this.getItemsFromStorage<T>(key);
    items = items.map(item => item.id === updatedItem.id ? updatedItem : item);
    this.saveItemsToStorage(key, items);
    return of(items);
  }

  deleteItem<T extends HasId>(key: string, id: number): Observable<T[]> {
    let items = this.getItemsFromStorage<T>(key);
    items = items.filter(item => item.id !== id);
    this.saveItemsToStorage(key, items);
    return of(items);
  }

  private getItemsFromStorage<T>(key: string): T[] {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  }

  private saveItemsToStorage<T>(key: string, items: T[]): void {
    localStorage.setItem(key, JSON.stringify(items));
  }
}

//O que é um serviço no Angular?
//Um serviço no Angular é uma classe que contém métodos e propriedades que podem ser compartilhados entre diferentes partes de um aplicativo Angular.
//Os serviços são usados para encapsular a lógica de negócios e a comunicação com APIs externas.
//Eles são injetáveis e podem ser injetados em componentes, diretivas, pipes e outros serviços.
//Os serviços são uma forma de promover a reutilização de código e a separação de preocupações em um aplicativo Angular.
