import DriveContents from "~/app/drive-contents";
import { QUERIES } from "~/server/db/queries";

// SERVER COMPONENT
export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return (
      <section className="flex h-screen items-center justify-center">
        <div className="text-destructive italic">Invalid Folder ID</div>
      </section>
    );
  }

  const [files, folders, parents] = await Promise.all([
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId),
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
