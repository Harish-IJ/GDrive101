import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <section className="space-y-4">
      Seed Function
      <form
        action={async () => {
          "use server";
          console.log("From Server");

          const folderInsert = await db.insert(folders_table).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
            })),
          );
          const fileInsert = await db.insert(files_table).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              url: file.url,
              size: "5000",
              parent: (index % 3) + 1,
            })),
          );

          console.log("Folder Insert", folderInsert);
          console.log("File Insert", fileInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </section>
  );
}
