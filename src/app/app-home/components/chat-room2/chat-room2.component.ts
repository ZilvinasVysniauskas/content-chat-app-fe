import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutosizeModule } from 'ngx-autosize';

@Component({
  selector: 'app-chat-room2',
  standalone: true,
  imports: [CommonModule, AutosizeModule],
  templateUrl: './chat-room2.component.html',
  styleUrls: ['./chat-room2.component.scss']
})
export class ChatRoom2Component {
}