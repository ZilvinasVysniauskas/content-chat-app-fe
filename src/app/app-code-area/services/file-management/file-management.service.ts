import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectTreeNode, TreeNodeType } from '../../types';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { setFilesMap } from 'src/app/state/actions/code-area-actions';

@Injectable({
  providedIn: 'root'
})
export class FileManagementService {

  constructor(private httpClient: HttpClient, private store: Store) { }

  getProjectFiles(id: string): Observable<ProjectTreeNode> {
    return this.httpClient.get<ProjectTreeNode>(`/api/file-management-service/api/v1/project-files/project/${id}`).pipe(
      tap((projectTreeNode: ProjectTreeNode) => {
        const filesContentMap = this.createFileContentMap(projectTreeNode, new Map<string, string>());
        this.store.dispatch(setFilesMap({ filesMap: filesContentMap }));
      })
    );
  }

  private createFileContentMap(projectTreeNode: ProjectTreeNode, map: Map<string, string>): Map<string, string> {
    if (projectTreeNode.type === TreeNodeType.FILE) {
      map.set(projectTreeNode.id, projectTreeNode.content);
    } else {
      projectTreeNode.children.forEach((child) => {
        this.createFileContentMap(child, map);
      });
    }
    return map;
  }
}
