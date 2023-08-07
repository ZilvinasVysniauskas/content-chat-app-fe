import { createAction, props } from '@ngrx/store';
import { EditorParameters } from '../types';

export const setEditorParameters = createAction(
    '[App] Set Editor Parameters',
    props<{ editorParameters: EditorParameters }>()
  );

export const setFilesMap = createAction(
    '[App] Set Files Map',
    props<{ filesMap: Map<string, string> }>()
  );

export const setFileContent = createAction(
    '[App] Set File Content',
    props<{ id: string, content: string }>()
  );