
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { UpdateFileRequest } from '../../types';


@Injectable({
  providedIn: 'root'
})
export class FileManagementWebsocketService {


  private stompClient: any;

  constructor() {
    let sockjs = new SockJS('/api/file-management-service/myWebSocket');
    this.stompClient = Stomp.over(sockjs);
    this.stompClient.connect({},
      (frame: any) => {
        console.log('Connected: ' + frame);
      },
      (error: any) => {
        console.log('Error: ' + error);
      }
    );
  }

  subscribeToTopic(callback: (message: any) => void): void {
    this.stompClient.subscribe('/topic/test01', (message: any) => {
      callback(message);
    });
  }

  sendCodeChange(updateFileRequest: UpdateFileRequest) {
    console.log(updateFileRequest)
    this.stompClient.send('/app/test01', {}, JSON.stringify(updateFileRequest));
  }
}