export interface FetchResponse{
  data: any;
  success: boolean;
  message: string;
}

export interface FolderNode {
  id: number;
  name: string;
  parentId: number | null;
  children: FolderNode[];
}

export interface File {
  id: number;
  name: string;
  folderId: number;
}
