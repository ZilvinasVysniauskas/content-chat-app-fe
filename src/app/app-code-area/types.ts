export interface ProjectTreeNode {
    id: string;
    name: string;
    content: string;
    language: Language;
    type: TreeNodeType;
    children: ProjectTreeNode[];
}

export interface UpdateFileRequest {
    id: string;
    content: string;
}

export enum Language {
    JAVA = 'java',
    NONE = 'none',
}

export enum TreeNodeType {
    FILE = 'FILE',
    DIRECTORY = 'DIRECTORY',
}