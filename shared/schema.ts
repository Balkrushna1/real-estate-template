import { pgTable, text, serial, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  type: text("type").notNull(), // 'residential' | 'commercial'
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  sqft: integer("sqft").notNull(),
  imageUrl: text("image_url").notNull(),
  isFeatured: boolean("is_featured").default(false),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
});

export const insertListingSchema = createInsertSchema(listings).omit({ id: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true });

export type Listing = typeof listings.$inferSelect;
export type InsertListing = z.infer<typeof insertListingSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
