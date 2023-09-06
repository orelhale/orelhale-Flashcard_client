import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, throwError, catchError } from 'rxjs';

export class DataService {

  private baseUrl = "http://localhost:3000/"
  
  constructor(private url: string, public httpClient: HttpClient) {
    this.url = (this.baseUrl + url)
    // console.log("url == ", this.url);
  }

  protected getAll() {
    return this.httpClient.get<any[]>(this.url).pipe(
      map(data => data),
      catchError(error => throwError(error))
    )
  }

  protected create(obj: any) {
    console.log("obj == ", obj);

    return this.httpClient.post(this.url, obj).pipe(
      map(data => data),
      catchError(error => throwError(error))
    )
  }

  protected updata(obj: any, id: string) {
    return this.httpClient.patch(`${this.url}/${id}`, obj).pipe(
      map(data => data),
      this.handleError()
    )
  }

  protected delete(id: string) {
    console.log("url ==", `${this.url}/${id}`);
    let url = `${this.url}/${id}`
    return this.httpClient.delete(`${this.url}/${id}`).pipe(
      map(data => data),
      this.handleError()
    )
  }

  protected get BaseUrl() {
    return this.baseUrl
  }

  protected get Url() {
    return this.url
  }

  protected handleError() {
    return catchError(error => {
      console.log("error");
      alert("error")
      return throwError(error)
    })
  }

}
