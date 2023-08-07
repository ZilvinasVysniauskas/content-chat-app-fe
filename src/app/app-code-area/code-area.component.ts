import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { FileManagementService } from './services/file-management/file-management.service';
import { ProjectTreeNode } from './types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-code-area',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    FileTreeComponent,
    CodeEditorComponent
  ],
  templateUrl: './code-area.component.html',
  styleUrls: ['./code-area.component.scss']
})
export class CodeAreaComponent implements OnInit {

  projectTreeNode$: Observable<ProjectTreeNode>

  constructor(private fileManagementService: FileManagementService) {
    this.projectTreeNode$ = this.fileManagementService.getProjectFiles('64b7e1f50e6e816755aec882');
   }

  ngOnInit(): void {}

  updateFile(): void {

  }

}
