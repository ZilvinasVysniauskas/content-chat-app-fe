import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { LocalStorageKeys } from 'src/app/app-authorization/constants';
import { MessageRequest, Message } from '../../types';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  messages = this.socket.fromEvent<any>('message');
  roomId = '646907ab6c3802ad2cc4ccb9';

  constructor(private socket: Socket) {
    this.socket.ioSocket.io.opts.query = { token: localStorage.getItem(LocalStorageKeys.token) };
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('error', (error: any) => {
      console.log(error);
    });

    this.socket.emit('joinRoom', this.roomId);
  }
  
  receiveMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('message');
  }

  emitVideoState(videoState: string) {
    this.socket.emit('changeVideoState', videoState);
  }

  emitVideoTimestamp(videoTime: number) {
    this.socket.emit('changeVideoTimestamp', videoTime);
  }

  receiveVideoState(): Observable<string> {
    return this.socket.fromEvent<string>('videoState');
  }

  receiveVideoTimestamp(): Observable<number> {
    return this.socket.fromEvent<number>('videoTimestamp');
  }

  sendMessage(messageRequest: MessageRequest) {
    this.socket.emit('sendToRoom', {
      roomId: messageRequest.roomId,
      message: messageRequest.message,
      sender: localStorage.getItem(LocalStorageKeys.userId),
      savedFileId: messageRequest.savedFileId,
      fileKey: messageRequest.fileKey
    });
  }
  
}
