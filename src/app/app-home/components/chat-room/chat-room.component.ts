import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { AwsService } from '../../services/aws/aws.service';
import { ChatRoom, Message } from '../../types';
import { ChatService } from '../../services/chat/chat.service';
import { Subject, debounceTime, take } from 'rxjs';
import { YoutubeEmbedComponent } from "../youtube-embed/youtube-embed.component";

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        YoutubeEmbedComponent
    ]
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {

  messages: Message[] = [];
  messageControl = new    (null);
  selectedFile: File | undefined;
  roomName: string | undefined;
  fileUrls = new Map<string, string>();

  private roomId = '646907ab6c3802ad2cc4ccb9';
  private scrollSubject = new Subject();
  private limit = 30;
  private offset = 0;
  private lastScrollTop = 0;
  private scrollToBottomRequired = true;

  @ViewChild('scrollContainer', { static: true })
  private scrollContainer!: ElementRef;

  constructor(
    private webSocketService: WebSocketService,
    private awsService: AwsService,
    private chatService: ChatService,
    private renderer: Renderer2
  ) {
  }
  ngAfterViewChecked(): void {
    if (this.scrollToBottomRequired) {
      this.scrollToBottom();
    }
  }

  ngOnInit() {
    this.setUpLazyLoadingListener();
    this.loadRoom(this.roomId);
    this.getMessages(this.roomId);
    this.listenForIncomingMessages();
    this.scrollSubject.pipe(debounceTime(100)).subscribe(() => this.getMessages(this.roomId));
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // Here 80% is considered the point at which next page will be loaded
    if (pos > max * 0.8 && pos > this.lastScrollTop) {
      this.scrollSubject.next(null);
    }
    this.lastScrollTop = pos;
  }

  sendMessage() {
    if (this.selectedFile) {
      this.handleFileMessageSend(this.selectedFile);
      this.selectedFile = undefined;
      this.messageControl.reset();
    } else if (this.messageControl.value) {
      this.handleTextMessageSend();
      this.messageControl.reset();
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  isImage(fileName: string): boolean {
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].some(ext => fileName?.toLowerCase().endsWith(ext));
  }

  private setUpLazyLoadingListener(): void {
    this.renderer.listen(this.scrollContainer.nativeElement, 'scroll', () => {
      const pos = this.scrollContainer.nativeElement.scrollHeight - (this.scrollContainer.nativeElement.scrollTop + this.scrollContainer.nativeElement.clientHeight);
      let max = this.scrollContainer.nativeElement.scrollHeight;
      // Here 80% is considered the point at which next page will be loaded
      if (pos > max * 0.5 && pos > this.lastScrollTop) {
        this.scrollSubject.next(null);
        console.log('scrolled');
        this.lastScrollTop = pos + 100;
      }
    });
  }

  private handleFileMessageSend(selectedFile: File): void {
    const objectUrl = URL.createObjectURL(selectedFile);
    this.fileUrls.set(selectedFile.name, objectUrl);
    this.awsService.uploadFile(selectedFile).subscribe((savedFileId) => {
      const fileKey = `${savedFileId}.${selectedFile.name.split('.').pop()}`;
      this.webSocketService.sendMessage({
        message: this.messageControl.value,
        roomId: this.roomId,
        savedFileId: savedFileId,
        fileKey: fileKey
      });

      this.messages.push({
        message: this.messageControl.value,
        file: {
          fileName: selectedFile.name,
          url: objectUrl,
        },
        createdAt: new Date(),
      });
    });
    this.scrollToBottomRequired = true;
  }

  private handleTextMessageSend(): void {
    this.webSocketService.sendMessage({ message: this.messageControl.value, roomId: this.roomId });
    this.messages.push({
      message: this.messageControl.value,
      createdAt: new Date(),
    });
    this.scrollToBottomRequired = true;
  }

  private getMessages(roomId: string): void {
    this.chatService.getMessages(roomId, this.offset, this.limit).subscribe((messages: any[]) => {
      this.messages.unshift(...messages.reverse());
      this.scrollToBottomRequired = this.offset == 0;
      this.offset += this.limit;
    });
  }

  private loadRoom(roomId: string): void {
    this.chatService.getRoom(roomId).pipe(take(1)).subscribe((room: ChatRoom) => {
      this.roomName = room.name;
    });
  }

  private listenForIncomingMessages(): void {
    this.webSocketService.receiveMessage().subscribe((message: Message) => {
      if (message.file) {
        const fileName = message.file.fileName;
        this.awsService.getFile(message.file.url).subscribe(blob => {
          const objectUrl = URL.createObjectURL(blob);
          this.fileUrls.set(fileName, objectUrl);
        });
        this.messages.push(message);
        this.scrollToBottomRequired = true;
      } else {
        this.messages.push(message);
        this.scrollToBottomRequired = true;
      }
    });
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      this.scrollToBottomRequired = false;
    } catch (err) { }
  }
}
