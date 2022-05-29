import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'https://jsonplaceholder.typicode.com/todos';
  
  constructor(private httpClient: HttpClient,) { }
  
  getTodoList(): Observable<any> {
    return this.httpClient
      .get<any>(this.url)
      .pipe(catchError(this.handleError));
  }
  getTodoItemById(id : number): Observable<any> {
    return this.httpClient
      .get<any>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if(error.status === 403){
        console.log('here');
      }
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}




