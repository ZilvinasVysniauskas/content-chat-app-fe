import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoom2Component } from './chat-room2.component';

describe('ChatRoom2Component', () => {
  let component: ChatRoom2Component;
  let fixture: ComponentFixture<ChatRoom2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChatRoom2Component]
    });
    fixture = TestBed.createComponent(ChatRoom2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
