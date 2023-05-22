import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor(private httpClient: HttpClient) { }

  public uploadFile(file: File): Observable<string> {
    return this.httpClient.post<{ url: string, fileId: string }>('/api/chat-room/files', {
      fileName: file.name,
      contentType: file.type,
    }).pipe(
      switchMap((response) => {
        return this.httpClient.put<any>(response.url, file, { headers: { 'Content-Type': file.type } }).pipe(
          map(() => response.fileId)
        );
      })
    );
  }

  public getFile(url: string): Observable<any> {
    return this.httpClient.get(url, { responseType: 'blob' });
  }
}
