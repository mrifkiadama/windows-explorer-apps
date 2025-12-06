import { FolderRepository } from "../repository/folder.repository";

export interface FolderNode {
  id: number;
  name: string;
  parentId: number | null;
  children: FolderNode[];
}

export class FolderService {
  private repo: FolderRepository;

  constructor() {
    this.repo = new FolderRepository();
  }

  async getTree(): Promise<FolderNode[]> {
    const flat = await this.repo.getTree();

    const map = new Map<number, FolderNode>();
    const roots: FolderNode[] = [];

    flat.forEach((f) => {
      map.set(f.id, { ...f, children: [] });
    });

    flat.forEach((f) => {
      const node = map.get(f.id)!;
      if (f.parentId == null) {
        roots.push(node);
      } else {
        const parent = map.get(f.parentId);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    return roots;
  }

  async getChildren(folderId: number | null) {
    return this.repo.getChildren(folderId);
  }
}
