import { TestBed } from '@angular/core/testing';

import { FileManagementWebsocketService } from './file-management-websocket.service';

describe('FileManagementWebsocketService', () => {
  let service: FileManagementWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileManagementWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
