import "server-only";

import { text,  index, singlestoreTableCreator, bigint} from 'drizzle-orm/singlestore-core'

export const createTable = singlestoreTableCreator((name) => `GDrive101_${name}`)

export const files_table = createTable('files_table',{
  id: bigint('id',{mode: 'number', unsigned: true}).primaryKey().autoincrement(),
  name: text('name').notNull(),
  size: text('size').notNull(),
  url: text('url').notNull(),
  parent: bigint('parent',{mode: 'number', unsigned: true}).notNull(),
}, (tempTable) => {
  return [
    index('parent_idx').on(tempTable.parent),
  ]
})

export const folders_table = createTable('folders_table',{
  id: bigint('id',{mode: 'number', unsigned: true}).primaryKey().autoincrement(),
  name: text('name').notNull(),
  parent: bigint('parent',{mode: 'number', unsigned: true})
}, (tempTable) => {
  return [index('parent_idx').on(tempTable.parent),]
})