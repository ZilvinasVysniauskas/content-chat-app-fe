import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatRoom } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl = '/api/chat-room';

  constructor(private http: HttpClient) { }


  public createRoom(roomData: any): Observable<any> {

    return this.http.post(this.baseUrl, roomData);
  }

  public addUserToRoom(roomId: string, userId: string): Observable<any> {
    return this.http.post(this.baseUrl + '/' + roomId + '/add-user', { userId: userId });
  }

  public getRoom(roomId: string): Observable<ChatRoom> {
    return this.http.get<ChatRoom>(this.baseUrl + '/' + roomId);
  }

  public getMessages(roomId: string, offset: number, limit: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + roomId + '/messages', { params: { offset: offset, limit: limit } });
  }

}