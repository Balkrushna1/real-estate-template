import { z } from "zod";

// Listing type definition
export interface Listing {
  id: number;
  title: string;
  description: string;
  price: string;
  address: string;
  city: string;
  type: 'residential' | 'commercial';
  bedrooms: number | null;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  isFeatured: boolean;
}

// Contact type definition
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Schema for inserting contacts (validation)
export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
