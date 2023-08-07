import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Language, ProjectTreeNode } from 'src/app/app-code-area/types';
import { Store } from '@ngrx/store';
import { setEditorParameters } from 'src/app/state/actions/code-area-actions';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {

  constructor(private store: Store) { }

  @Input() fileTreeNode: ProjectTreeNode | undefined;

  selectFile() {
    this.store.dispatch(setEditorParameters({
      editorParameters: {
        fileId: this.fileTreeNode?.id as string,
        language: this.fileTreeNode?.language as Language
      }
    }));
  }

}
