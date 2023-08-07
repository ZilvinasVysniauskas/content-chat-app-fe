import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTreeNode, TreeNodeType } from '../../types';
import { FileComponent } from './file/file.component';
import { DirectoryComponent } from './directory/directory.component';

@Component({
  selector: 'app-file-tree',
  standalone: true,
  imports: [
    CommonModule,
    FileComponent,
    DirectoryComponent
  ],
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent {
  @Input() projectTreeNode: ProjectTreeNode | undefined | null;

  readonly TreeNodeType = TreeNodeType;

}
