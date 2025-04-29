import "server-only"
import { db } from "~/server/db";
import {
  files_table as fileSchema,
  folders_table as folderSchema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {

  getAllParentsForFolder: async function (folderId: number) {
  const parents = [];
  let currentFolderId: number | null = folderId;
  while (currentFolderId !== null) {
    const folder = await db
      .selectDistinct()
      .from(folderSchema)
      .where(eq(folderSchema.id, currentFolderId));

    if (!folder?.[0]?.id) {
      throw new Error("Parent Folder not found");
    }

    parents.unshift(folder[0]);
    currentFolderId = folder?.[0]?.parent;
  }
  return parents;
},
getFolders: function (folderId: number) {
  return db.select().from(folderSchema).where(eq(folderSchema.parent, folderId));
},

getFiles: function (folderId: number) {
  return db.select().from(fileSchema).where(eq(fileSchema.parent, folderId));
}

}
