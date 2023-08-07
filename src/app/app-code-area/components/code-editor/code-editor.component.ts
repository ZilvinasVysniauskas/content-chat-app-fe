import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCodeAreaFileId, selectCodeAreaLanguage, selectFileContentById } from 'src/app/state/selectors/code-area-selector';
//@ts-ignore
import { Subject, debounceTime, switchMap, take, takeUntil } from 'rxjs';
import { Language } from '../../types';
import { FileManagementWebsocketService } from '../../services/file-management-websocket/file-management-websocket.service';
import { setFileContent } from 'src/app/state/actions/code-area-actions';

export const language = signal('java');

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MonacoEditorModule],
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnDestroy {
  private destroy$ = new Subject();
  private codeChangeSubject = new Subject<string>();
  private currentFileId: string | undefined;
  private fileSwitched: boolean = false;

  editorOptions = { theme: 'vs-dark', language: Language.NONE, dimension: { height: 600, width: 10000 } };
  content: string = 'no file selected';

  constructor(private store: Store, private webSocketService: FileManagementWebsocketService) {
    this.store.select(selectCodeAreaLanguage).pipe(takeUntil(this.destroy$)).subscribe(language => {
      this.editorOptions = { ...this.editorOptions, language: language };
    });
    
    this.store.select(selectCodeAreaFileId)
    .pipe(
      takeUntil(this.destroy$),
      switchMap(fileId => {
        this.fileSwitched = this.currentFileId !== fileId;
        this.currentFileId = fileId;
        return this.store.select(selectFileContentById(fileId as string))
      }),
      ).subscribe(content => {
        this.content = content;
      });

    this.codeChangeSubject.pipe(
      debounceTime(500)
    ).subscribe(newCode => this.sendCodeChange(newCode));

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onCodeChanged(code: string) {
    if (this.fileSwitched) {
      this.fileSwitched = false;
      return;
    }
    this.codeChangeSubject.next(code);
  }

  sendCodeChange(newCode: string) {
    if (this.currentFileId) {
      this.store.dispatch(setFileContent({ id: this.currentFileId, content: newCode }));
      this.webSocketService.sendCodeChange({
        id: this.currentFileId,
        content: newCode,
      });
    }
  }

}
