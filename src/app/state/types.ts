import { Language } from "../app-code-area/types";

export interface UserProfile {
    username: string;
    email: string;
}

export interface LoadingStatus {
    loading: boolean;
    loaded: boolean;
};

export interface EditorParameters {
  language?: Language;
  fileId?: string;
}