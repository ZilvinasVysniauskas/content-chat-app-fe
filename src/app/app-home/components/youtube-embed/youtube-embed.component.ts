import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../services/web-socket/web-socket.service';

declare var YT: any;

@Component({
  selector: 'app-youtube-embed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './youtube-embed.component.html',
  styleUrls: ['./youtube-embed.component.scss']
})
export class YoutubeEmbedComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() videoId!: string;
  private player: any;
  private ngUnsubscribe = new Subject();
  private emitVideoState = true;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.receiveVideoState().subscribe((state: string) => {
      if (state === 'play') {
        this.player.playVideo();
      }
      else if (state === 'pause') {
        this.player.pauseVideo();
      }
      this.emitVideoState = false;
    });

    this.webSocketService.receiveVideoTimestamp().subscribe((timestamp: number) => {
      this.player.seekTo(timestamp);
      this.emitVideoState = false;
    });
  }

  ngAfterViewInit(): void {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag!.parentNode!.insertBefore(tag, firstScriptTag!);

    //@ts-ignore
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  startVideo(): void {
    this.player = new YT.Player('youtube-player', {
      height: '390',
      width: '640',
      videoId: this.videoId,
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
      }
    });
    console.log(this.player);
  }

  // @ts-ignore
  onPlayerStateChange(event): void {
    if (this.emitVideoState) {
      switch (event.data) {
        case YT.PlayerState.PAUSED:
          this.webSocketService.emitVideoState('pause');
          break;
        case YT.PlayerState.PLAYING:
          this.webSocketService.emitVideoState('play');
          this.webSocketService.emitVideoTimestamp(this.player.getCurrentTime());
      }
    } else {
      this.emitVideoState = true;
    }
  }

}