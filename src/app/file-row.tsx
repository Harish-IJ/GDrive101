import { FileIcon, FolderIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import type { files_table, folders_table } from "~/server/db/schema";

export const FileRow = ({
  file,
}: {
  file: typeof files_table.$inferSelect;
}) => {
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-3 text-gray-400">File</div>
        <div className="col-span-3 text-gray-400">2 MB</div>
      </div>
    </li>
  );
};

export const FolderRow = ({
  folder,
}: {
  folder: typeof folders_table.$inferSelect;
}) => {
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400">Folder</div>
        <div className="col-span-3 text-gray-400">--</div>
      </div>
    </li>
  );
};
