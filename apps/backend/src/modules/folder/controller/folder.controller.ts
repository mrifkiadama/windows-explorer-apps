import { t, type Elysia } from "elysia";
import { FolderService } from "../service/folder.service";

export const folderController = (app: Elysia) => {
  const service = new FolderService();

  return app.group("/api/v1/folders", (app) =>
    app
      .get("/tree", async () => {
        const tree = await service.getTree();
        
        if (!tree || tree.length === 0) {
          return { 
            data: [],
            success: true,
            message: "No folders found"
          };
        }
        
        return { 
          data: tree,
          success: true,
          message: "Folder tree retrieved successfully"
        };
      })

      .get(
        "/:id/children",
        async ({ params }) => {
          const id = params.id === "root" ? null : Number(params.id);
          const data = await service.getChildren(id);
          
          if (!data || (data.folders.length === 0 && data.files.length === 0)) {
            return { 
              data: { folders: [], files: [] },
              success: true,
              message: "No children found"
            };
          }
          
          return { 
            data,
            success: true,
            message: "Folder children retrieved successfully"
          };
        },
        {
          params: t.Object({
            id: t.String(),
          }),
        }
      )
  );
};
