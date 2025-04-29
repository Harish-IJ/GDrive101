import { db } from "~/server/db";
import {
  files as fileSchema,
  folders as folderSchema,
} from "~/server/db/schema";
import DriveContents from "~/app/drive-contents";
import { eq } from "drizzle-orm";

async function getAllParents(folderId: number) {
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
}

// SERVER COMPONENT
export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <section>Invalid Folder ID</section>;
  }

  const filesPromise = await db
    .select()
    .from(fileSchema)
    .where(eq(fileSchema.parent, parsedFolderId));

  const foldersPromise = await db
    .select()
    .from(folderSchema)
    .where(eq(folderSchema.parent, parsedFolderId));

  const parentsPromise = getAllParents(parsedFolderId);

  const [files, folders, parents] = await Promise.all([
    filesPromise,
    foldersPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
