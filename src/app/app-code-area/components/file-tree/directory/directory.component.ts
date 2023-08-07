import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTreeNode } from 'src/app/app-code-area/types';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent {

  @Input() directoryTreeNode: ProjectTreeNode | undefined;

}
