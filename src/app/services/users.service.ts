import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IUserResponse } from '../interfaces/iuser-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = "https://peticiones.online/api/users";
  private http = inject(HttpClient);

  getAll(page: number = 1): Promise<IUserResponse> {
    return firstValueFrom(this.http.get<IUserResponse>(`${this.baseUrl}?page=${page}`));
  }

  getById(id: string): Promise<IUser> {
    return lastValueFrom(this.http.get<IUser>(`${this.baseUrl}/${id}`));
  }

  insert(user: IUser): Promise<IUser> {
    return firstValueFrom(this.http.post<IUser>(this.baseUrl, user));
  }

  update(id: string, user: IUser): Promise<IUser> {
    return firstValueFrom(this.http.put<IUser>(`${this.baseUrl}/${id}`, user));
  }

  delete(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
  }
} 
