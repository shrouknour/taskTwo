import { User } from '../interface/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SerapiService {
  constructor(public _httpClient: HttpClient) {}

  // getall():Observable<Task[]>{
  //   return this._httpClient.get<Task[]>(`${environment.pathUrl}/users`).pipe(
  //     catchError(
  //      Error: (error:any)=>{
  //         return ThrowError(err.message || "error");
  //       }
  //     )
  //   )
  // }

  getall(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${environment.pathUrl}/users`);
  }

  getId(id: number): Observable<User> {
    return this._httpClient.get<User>(`${environment.pathUrl}/users/${id}`);
  }
  addUserServ(user: User): Observable<User> {
    return this._httpClient.post<User>(`${environment.pathUrl}/users`, user);
  }
  update(id: number, user: User): Observable<User> {
    return this._httpClient.put<User>(
      `${environment.pathUrl}/users/${id}`,
      user
    );
  }
  delete(id:number) :Observable<User>{
    return this._httpClient.delete<User>(`${environment.pathUrl}/users/${id}`)
  }


  findByName(name: string): Observable<User[]> {
    return this._httpClient.get<User[]>(`${environment.pathUrl}?name=${name}`);
  }
}
