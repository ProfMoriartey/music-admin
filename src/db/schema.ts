import { pgTable, serial, varchar, timestamp, text, decimal } from 'drizzle-orm/pg-core';

export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  brandName: varchar('brand_name', { length: 255 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  budget: decimal('budget', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}); 