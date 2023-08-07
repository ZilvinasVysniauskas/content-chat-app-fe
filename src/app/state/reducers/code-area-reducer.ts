import { createReducer, on } from '@ngrx/store';
import { EditorParameters } from '../types';
import { setEditorParameters, setFileContent, setFilesMap } from '../actions/code-area-actions';
import { Language } from 'src/app/app-code-area/types';

export interface CodeAreaState {
    editorParameters?: EditorParameters;
    filesMap: Map<string, string>;
}

export const initialState: CodeAreaState = {
    editorParameters: {
        language: Language.JAVA,
        fileId: ''
    },
    filesMap: new Map<string, string>()
};

export const appReducer = createReducer(
    initialState,
    on(setEditorParameters, (state, { editorParameters }) =>
    ({
        ...state,
        editorParameters: editorParameters
    })),
    on(setFilesMap, (state, { filesMap }) => (
        {
            ...state,
            filesMap: mapToObject(filesMap)
        }
    )),
    on(setFileContent, (state, { id, content }) => {
        const newFilesMap = {
            ...state.filesMap,
            [id]: content
        };
        return {
            ...state,
            filesMap: newFilesMap
        };
    })
);

const mapToObject = (map: Map<any, any>) => {
    return Object.fromEntries(map);
  };

export function codeAreaReducer(state: CodeAreaState | undefined, action: any) {
    return appReducer(state, action);
}