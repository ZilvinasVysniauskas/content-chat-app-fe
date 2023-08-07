import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CodeAreaState } from '../reducers/code-area-reducer';
import { Language } from 'src/app/app-code-area/types';

export const selectCodeAreaState = createFeatureSelector<CodeAreaState>('codeArea');

export const selectCodeAreaParameters = createSelector(
    selectCodeAreaState,
    (state: CodeAreaState) => state.editorParameters || {}
);

export const selectCodeAreaLanguage = createSelector(
    selectCodeAreaState,
    (state: CodeAreaState) => state.editorParameters?.language || Language.NONE
);

export const selectCodeAreaFileId = createSelector(
    selectCodeAreaState,
    (state: CodeAreaState) => state.editorParameters?.fileId
);

export const selectFilesMap = createSelector(
    selectCodeAreaState,
    (state: CodeAreaState) => state.filesMap
);

export const selectFileContentById = (id: string) => createSelector(
    selectFilesMap,
    //@ts-ignore
    (filesMap) => filesMap[id]
  );