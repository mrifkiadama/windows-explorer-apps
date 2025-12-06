import { prisma } from '@core/db/prisma';

export class FolderRepository {
  async getTree() {
    const folders = await prisma.folder.findMany({
      include: {
        files: true,
      },
      orderBy: { id: 'asc' },
    });

    return folders;
  }

  async getChildren(folderId: number | null) {
    const folders = await prisma.folder.findMany({
      where: { parentId: folderId },
      orderBy: { name: 'asc' },
    });

    const files = await prisma.file.findMany({
      where: { folderId: folderId ?? undefined },
      orderBy: { name: 'asc' },
    });

    return { folders, files };
  }
}
